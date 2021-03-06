import {withLayout} from "../../layout/Layout";
import { GetStaticProps} from "next";
import axios from "axios";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import styles from './Trips.module.css';







function Trip({countries}) {

    const { register, watch, handleSubmit, control } = useForm({
        defaultValues: {
            covid: false,
            company_name: '',
            street: '',
            street_num: 0,
            city: '',
            country: 'Select country',
            zip: '',
            end_date: new Date(),
            start_date: new Date(),
            covid_test_date: new Date()
        }
    })

    const moreDetail = watch("covid");
    const onSubmit = handleSubmit(data => {
        const config = {
            headers: { Authorization: `Bearer d7rZ43r4K3nCEOz08Z7d` }
        };
        const bodyParameters = {
            start_date: data.start_date,
            end_date: data.end_date,
            company_name: data.company_name,
            address: {
                street: data.street,
                street_num: +data.street_num,
                city: data.city,
                country: data.country,
                zip: data.zip
            },
            covid: data.covid,
            covid_test_date: data.covid_test_date
        }
        axios.post(
            process.env.NEXT_PUBLIC_DOMAIN + 'api/trip',
            bodyParameters,
            config
        ).then(console.log).catch(console.log);


        axios.get(
            process.env.NEXT_PUBLIC_DOMAIN + 'api/trip',
            config
        ).then(console.log).catch(console.log);

    });



    return (
        <div className={styles.trip}>
            <form onSubmit={onSubmit} className={styles.form}>
                <div className={styles.block}>
                    <div>Where do you want to go</div>
                    <div className={styles.selectWrapper}>
                        <select name="select"   {...register("country", { required: true })}>
                            <option value='Select country'  >
                                Select country
                            </option>
                            {countries.map((item, index) => {
                                return (
                                    <option value={item.label} key={index}>{item.label}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>


               <div className={styles.block}>
                  <div className={styles.covid}>
                      <label>Have you been recently tested for <b>COVID-19?</b></label>
                      <div className={styles.covidBox}>
                          Yes
                          <input type="checkbox" {...register("covid")} />
                      </div>

                      {moreDetail && (
                          <div>
                              <label className={styles.covidBox}>
                                  Date of receiving test results
                              </label>
                              <Controller
                                  control={control}
                                  name="covid_test_date"
                                  render={({ field }) => (
                                      <ReactDatePicker
                                          className="input"
                                          placeholderText="Select date"
                                          dateFormat="d m, yyyy"
                                          onChange={(e) => {
                                              field.onChange(e)
                                              console.log(field)
                                          }}
                                          selected={field.value}
                                      />

                                  )}
                              />
                          </div>
                      )}
                  </div>
               </div>

                <div className={styles.block}>
                    <div className={styles.blockItem}>
                        <label>Company name</label>
                        <input className={styles.blockInput} type="text" {...register("company_name")} placeholder="Type here..."/>
                    </div>
                </div>

                <div className={styles.block}>
                    <div className={styles.blockItem}>
                    <label>City</label>
                    <input className={styles.blockInput} type="text" {...register("city")} placeholder="Type here..." />
                    </div>
                </div>

                <div className={styles.block}>
                     <div className={styles.blockItem}>
                    <label>Street</label>
                    <input className={styles.blockInput} type="text" {...register("street")} placeholder="Type here..." />
                    </div>
                </div>


                <div className={styles.block}>
                    <div className={styles.blockItem}>
                    <label>Street num</label>
                    <input className={styles.blockInput} type="number" {...register("street_num")} placeholder="Type here..."/>
                    </div>
                </div>


                <div className={styles.block}>

                    <div className={styles.blockItem}>
                    <label>Zip code</label>
                    <input className={styles.blockInput} type="text" {...register("zip")} placeholder="Type here..."/>
                    </div>
                </div>



                <div className={styles.block}>
                    
                    <label>
                        Start date
                    </label>
                    <Controller
                        control={control}
                        name="start_date"
                        render={({ field }) => (
                            <ReactDatePicker
                                className="input"
                                placeholderText="Select date"
                                dateFormat="MMMM d, yyyy"
                                onChange={(e) => {
                                    field.onChange(e)
                                    console.log(field)
                                }}
                                selected={field.value}
                            />

                        )}
                    />
                    
                </div>

                <div className={styles.block}>
                    <label>
                        End date
                    </label>
                    <Controller
                        control={control}
                        name="end_date"
                        render={({ field }) => (
                            <ReactDatePicker
                                className="input"
                                placeholderText="Select date"
                                dateFormat="MMMM d, yyyy"
                                onChange={(e) => {
                                    field.onChange(e)
                                    console.log(field)
                                }}
                                selected={field.value}
                            />
                        )}

                    />
                </div>

                <button
                    type="submit"
                >
                    Send
                </button>
            </form>
        </div>
    )
}

export default withLayout(Trip)




export const getStaticProps: GetStaticProps = async () => {

    const {data: countries} = await  axios.get(process.env.NEXT_PUBLIC_DOMAIN + 'api/country', { headers: { Authorization: `Bearer d7rZ43r4K3nCEOz08Z7d` } })
    return {
        props: {
            countries
        }
    }


}




