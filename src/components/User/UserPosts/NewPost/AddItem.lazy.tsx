import React, {lazy, Suspense} from 'react';
import Loading from "../../../Common/Loading";

const LazyAddItem = lazy(() => import('./NewPost'));

const AddItem = () => (
    <Suspense fallback={<Loading/>}>
        <LazyAddItem/>
    </Suspense>
);

export default AddItem;