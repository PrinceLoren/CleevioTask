import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';
import BtnIcon from './BtnIcon.svg'



export const Button = ({ appearance, className, ...props }: ButtonProps): JSX.Element => {
    return (
        <button
            className={cn(styles.button, className, {
                [styles.primary]: appearance == 'primary',
                [styles.ghost]: appearance == 'hover',
                [styles.disable]: appearance == 'disabled',
                [styles.loading]: appearance == 'loading',
            })}
            {...props}
        >
            New Trip
            <BtnIcon  className={styles.icon}/>
        </button>
    );
};