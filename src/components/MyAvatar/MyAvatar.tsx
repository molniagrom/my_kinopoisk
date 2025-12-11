import Avatar from '@mui/material/Avatar';

interface MyAvatarProps {
    src: string;
    alt?: string;
    size?: number;
}

export const MyAvatar = ({ src, alt = 'Avatar', size = 30 }: MyAvatarProps) => {
    return (
        <Avatar
            src={src}
            alt={alt}
            sx={{
                width: size,
                height: size,
            }}
        />
    );
};

export default MyAvatar;
