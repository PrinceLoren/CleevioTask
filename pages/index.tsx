
import {Button} from "../components";
import {withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import axios from "axios";
import { Country} from "../interfaces/country.interface";

function Home({countries}: HomeProps): JSX.Element {
  return (
     <>
         <div>Your trips</div>


         {countries.map((item) => {
             return (
                 <div>
                     {item.value}
                     {item.label}
                 </div>
             )
         })}

     </>
  )
}

export default withLayout(Home)


export const getStaticProps: GetStaticProps = async () => {
    const {data: countries} = await  axios.get<Country[]>(process.env.NEXT_PUBLIC_DOMAIN + 'api/country', { headers: { Authorization: `Bearer jywoU4SO1h9KqWhHMhPr` } })
    return {
        props: {
            countries
        }
    }
}


interface HomeProps {
    countries: Country[]
}