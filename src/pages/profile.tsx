import { ProfileMenu } from '../components/profile-menu/profile-menu';
import {FC} from "react";

const Profile : FC<IProfile>  = ({ profileElement }) => {
    return (<div className='pt-20' style={{ display: 'flex', alignItems: 'center' }} >
        <ProfileMenu />
        <div>
            {profileElement}
        </div>

    </div>);
}

interface IProfile{
    profileElement: JSX.Element
}
export default Profile;