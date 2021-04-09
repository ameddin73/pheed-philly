/**
 * @jest-environment test/jest-env
 */
import React from 'react';
import PostList from "./PostList";
import {customRender, rendersNothingHere, resetFirebase, setupFirebase} from "test/utils";
import {screen, waitFor} from "@testing-library/react";
import {COLLECTIONS} from "util/config";
import {Query} from "util/utils";
import {FirestoreQueryWhere} from "util/types";
import {UserMocks} from "test/mocks/user.mock";
import {Types} from "../Post/types";

const path = COLLECTIONS.posts;
const orderBy = Query.orderByCreated;
const query = {
    where: [Query.whereActive, Query.whereNoExpiration],
    orderBy,
}
const props = {path, query};

beforeAll(setupFirebase);
afterEach(async () => await resetFirebase());

it('should mount', async () => {
    customRender(<PostList {...props}/>);
    await waitFor(() => expect(document.querySelector('#loading')).toBeNull(), {timeout: 60000})
}, 60000);

it('renders all posts', async () => {
    customRender(<PostList {...props}/>);
    await waitFor(() => expect(document.querySelector('#loading')).toBeNull())
    const posts = screen.getAllByText('Supplied by:');
    expect(posts.length).toBeGreaterThanOrEqual(3);
});

it('filters posts', async () => {
    const filter = ((post: Types) => post.uid !== UserMocks.defaultUser.uid);
    customRender(<PostList {...props} filter={filter}/>);
    await waitFor(() => expect(document.querySelector('#loading')).toBeNull())
    const posts = screen.getAllByText('Supplied by:');
    expect(posts.length).toBe(1);
});

it('renders NothingHere if query returns empty list', async () => {
    const newWhere: FirestoreQueryWhere = {
        fieldPath: 'displayName',
        opStr: '==',
        value: 'fake-name',
    }
    const newQuery = {
        where: [Query.whereActive, Query.whereNoExpiration, newWhere],
    };
    customRender(<PostList path={path} query={newQuery}/>);
    await waitFor(() => expect(document.querySelector('#loading')).toBeNull())
    screen.getByText('Oops, theres nothing here.');
});

it('renders NothingHere if filter filters all posts', async () => {
    const filter = (() => false);
    customRender(<PostList {...props} filter={filter}/>);
    await waitFor(() => expect(document.querySelector('#loading')).toBeNull())
    rendersNothingHere();
});