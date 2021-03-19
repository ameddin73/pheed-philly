import React from 'react';
import {FirebaseAuthConsumer} from "@react-firebase/auth";
import HubAction from "./HubAction/HubAction";
import ItemList from "../Common/ItemList/ItemList.lazy";
import {collections} from "../../util/config";
import {ItemInterface} from "../../util/types";
import {FirestoreQuery} from "@react-firebase/firestore/dist/types";
import {bindIds} from "../../util/utils";

const DistroHub = () => {
    const path = collections.items;
    const orderBy: FirestoreQuery['orderBy'] = [{field: 'created', type: 'asc'}]

    const unmarshal = (uid: string) => (
        (ids: string[], values: ItemInterface[]) => {
            values = bindIds<ItemInterface>(false, ids, values);
            values = values.filter(item => item.uid !== uid);
            return values;
        });

    return (
        <div>
            <FirebaseAuthConsumer>
                {({isSignedIn, user}) => {
                    return (
                        <ItemList path={path}
                                  orderBy={orderBy}
                            // @ts-ignore
                                  itemAction={(item) => (<HubAction id={item.id} path={path + item.id}/>)}
                                  unmarshal={unmarshal(isSignedIn ? user.uid : null)}/>
                    )
                }}
            </FirebaseAuthConsumer>
        </div>
    );
}

export default DistroHub;