/**
 * @jest-environment test/jest-env
 */
import React from 'react';
import {customRender, setupFirebase, signIn, teardownFirebase} from "test/utils";
import {screen, waitFor} from "@testing-library/react";
import {UserMocks} from "test/mocks/user.mock";
import UserPosts from './UserPosts';

beforeAll(async () => {
    await setupFirebase()
    await signIn(UserMocks.userTwo);
});
beforeEach(async () => {
    customRender(<UserPosts/>)
    await waitFor(() => expect(document.querySelector('#loading')).toBeNull(), {timeout: 60000})
}, 60000); // This is slow because the emulator has to create a new index
afterAll(teardownFirebase);

it('should mount', () => {
});

it('renders all posts', async () => {
    const posts = screen.getAllByText('Posted by');
    expect(posts.length).toBe(1);
});