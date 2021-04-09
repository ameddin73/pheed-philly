import {UserMocks} from "./user.mock";
import {DEFAULT_IMAGE} from "../../util/config";
import {Post} from "../../components/Common/Post/types";

export namespace PostMocks {
    export const defaultPost: Post = {
        id: 'default_post_id',
        name: 'default_post_displayName',
        active: true,
        created: new Date('01 Jan 1970 00:00:00 GMT'),
        description: 'default_post_description',
        hasExpiration: true,
        expires: new Date('02 Jan 2070 00:00:00 GMT'),
        image: DEFAULT_IMAGE,
        uid: UserMocks.defaultUser.uid,
        userName: UserMocks.defaultUser.name,
    };
    export const secondaryPost: Post = {
        id: 'secondary_post_id',
        name: 'secondary_post_displayName',
        active: true,
        created: new Date('01 Jan 1970 00:00:00 GMT'),
        description: 'secondary_post_description',
        hasExpiration: false,
        uid: UserMocks.userTwo.uid,
        userName: UserMocks.userTwo.name,
    };
}