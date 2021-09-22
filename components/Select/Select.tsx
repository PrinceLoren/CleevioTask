import styles from './Select.module.css';
import {GetStaticProps} from "next";
import axios from "axios";
import {Country} from "../../interfaces/country.interface";








export const Select = ({countries}: SelectProps): JSX.Element => {

    return (
       <div className={styles.selectWrapper}>
           <select name="select" >

               <option value='Select country' className={styles.select1} >
                   Select country
               </option>
               {countries.map((item, index) => {



                   return (
                       <option value={item.value} key={index}>{item.label}</option>
                   )
               })}

           </select>
       </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const {data: countries} = await  axios.get<SelectProps[]>(process.env.NEXT_PUBLIC_DOMAIN + 'api/country', { headers: { Authorization: `Bearer jywoU4SO1h9KqWhHMhPr` } })
    return {
        props: {
            countries
        }
    }
}


interface SelectProps {
    countries: Country[]
}
