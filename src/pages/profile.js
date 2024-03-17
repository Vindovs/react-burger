import { ProfileMenu } from '../components/profile-menu/profile-menu';

const Profile = ({ profileElement }) => {
    return (<div className='pt-20' style={{ display: 'flex', alignItems: 'center' }} >
        <ProfileMenu />
        <div>
            {profileElement}
        </div>

    </div>);
}

export default Profile;