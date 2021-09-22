import styles from './Layout.module.css';
import { LayoutProps } from './Layout.props';
import cn from 'classnames';
import BtnIcon from './BtnIcon.svg'
import {Sidebar} from "./Sidebar/Sidebar";
import {Component, FunctionComponent} from "react";
import {Tips} from "./Tips/Tips";



export const Layout = ({ children, className }: LayoutProps): JSX.Element => {
    return (
           <div className={styles.wrapper}>
               <Sidebar className={styles.sidebar}/>
               <div className={styles.body}>
                   {children}
               </div>
               <div className={styles.more}>
                    <Tips />
               </div>
           </div>
    );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
            return (
                <Layout>
                    <Component {...props}/>
                </Layout>
            )
    }
}