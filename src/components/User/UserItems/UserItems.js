import React, {useEffect} from 'react';
import ItemList from "../../Common/ItemList/ItemList.lazy";
import {FirebaseAuthConsumer} from "@react-firebase/auth";
import {navigate} from 'hookrouter';
import {paths} from "../../Common/config";
import UserAction from "./UserAction/UserAction.lazy";
import {Loading} from "../../Common/loading";

const UserItems = () => {
    const path = process.env.REACT_APP_DISTRO_HUB_COLLECTION;
    const orderBy = [{field: 'created', type: 'asc'}]
    const loaded = useEffect(() => (true));

    const unmarshal = ({ids, value}) => {
        value.forEach((item, index) => {
            item.id = ids[index]
            item.count = item.count - item.reserved;
        });
        return value;
    };

    return (
        <div>
            <FirebaseAuthConsumer>
                {({isSignedIn, user, providerId}) => {
                    if (providerId === null) {
                        return (<Loading/>)
                    } else if (isSignedIn !== true) {
                        navigate(paths.public.login, true, {redirect: paths.public.userItems});
                    } else {
                        const where = {field: 'uid', operator: '==', value: user.uid}
                        return (
                            <ItemList path={path} where={where} orderBy={orderBy}
                                      itemAction={(item) => (<UserAction item={item}/>)}
                                      unmarshal={unmarshal}/>
                        );
                    }
                }}
            </FirebaseAuthConsumer>
        </div>
    )
};

export default UserItems;