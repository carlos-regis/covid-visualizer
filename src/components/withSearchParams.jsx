import React from 'react';
import { useSearchParams } from 'react-router-dom';

function withSearchParams(Component) {
    return function ComponentWithSearchParams(props) {
        const [searchParams] = useSearchParams();

        return <Component {...props} router={{ searchParams }} />;
    };
}

export default withSearchParams;
