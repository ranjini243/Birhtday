import { useRoutes } from 'react-router-dom';
import Card from '../component/Card';
import Countdown from '../component/Countdown';
import React from 'react';

export default function Index() {
    return useRoutes([
        {
            path: '/',
            element: <Countdown />,
            children: [
                {
                    path: 'card',
                    element: <Card/>
                }
            ]
        }
    ]);
}
