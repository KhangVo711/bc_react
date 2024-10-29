import { Context } from '../../components/Context.js';
import {useContext } from 'react';

export default function Profile() {
    const {isData}  = useContext(Context);
    return (
        <div>
            <h1 className='text-center'>Thông tin của {isData.username}</h1>
        </div>
    )
}