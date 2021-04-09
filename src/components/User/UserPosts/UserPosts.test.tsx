/**
 * @jest-environment test/jest-env
 */
import React from 'react';
import UserPosts from './UserPosts';
import {customRender, resetFirebase, setupFirebase, signIn} from "test/utils";
import {screen, waitFor} from "@testing-library/react";
import {UserMocks} from "../../../test/mocks/user.mock";

beforeAll(async () => {
    await setupFirebase()
    await signIn(UserMocks.userTwo);
});
beforeEach(async () => {
    customRender(<UserPosts/>)
    await waitFor(() => expect(document.querySelector('#loading')).toBeNull(), {timeout: 60000})
}, 60000); // This is slow because the emulator has to create a new index
afterAll(async () => await resetFirebase(true));

it('should mount', () => {
});

it('renders all posts', async () => {
    const posts = screen.getAllByText('Supplied by:');
    expect(posts.length).toBe(1);
});

it('renders user action', async () => {
    const posts = screen.getAllByLabelText('delete');
    expect(posts.length).toBe(1);
});