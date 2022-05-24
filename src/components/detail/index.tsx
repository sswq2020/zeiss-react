import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getDetail } from "../../http";
import MacheItem from "../../types";
import styles from './index.module.css'

export default function Deatil() {
    const params = useParams();

    const [macheDeatil, setMacheDeatil] = useState<MacheItem>(Object.create(null))

    const fetchDeatil = async () => {
        const res = await getDetail(params.id!)
        setMacheDeatil(res)
    }

    useEffect(() => {
        fetchDeatil()
    }, [params.id])

    return (
        <>
              {
                  !macheDeatil.id && <div className={styles.loading}>Loading...</div>
              }
              {
                  macheDeatil.id && 
                  <>
                    <h3>MacheId ---- {macheDeatil.id}</h3>
                    <h3>Install Time---- {macheDeatil.install_date}</h3>
                    <h3>Status ---- {macheDeatil.status}</h3>
                    <h3>Past Event</h3>
                    <ul>
                        {macheDeatil.events && Array.isArray(macheDeatil.events) && macheDeatil.events.map((item,index)=>(
                            <li key={item.timestamp}><span>{item.timestamp.replace('T','-').replace('Z','')}</span> push status <span>{item.status}</span></li>
                        ))}
                    </ul>
                  </>
              }

        </>
    )
}