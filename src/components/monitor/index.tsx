import { useEffect, useRef, useState } from 'react'
import MacheItem from '../../types';
import { message } from '../../websocket'
import styles from './index.module.css'

export default function Monitor() {
    const [mache, setMache] = useState<MacheItem>(Object.create(null))
    let timer= useRef<any>();

    const start = () => {
        mockData();
        timer.current = setTimeout(() => {
            start()
        }, 3000)
    }

    const mockData = () => {
        message.emit('init')
    }

    const received = () => {
        message.on('push', (obj: any) => {
            console.log(obj)
            setMache(obj)
        })
    }

    const clear = () => {
        if (timer.current) {
            clearTimeout(timer.current)
            timer.current = null;
        }
    }
    
   useEffect(()=>{
    if (mache.status === 'idle') {
        clear();
    }
   },[mache.status])

    useEffect(() => {
        received();
    }, [])

    return (
        <>
            <div className={styles.Monitor}>
                <div>This is Monitor</div>
                {
                    !mache.id && <div className={styles.show} onClick={start}>Click here,Received</div>
                }
                {
                   mache.id && mache.status=== "idle" && <div className={styles.show} onClick={start}>This mache is idle,Pleae start again </div>
                }

                <div>Mache_Id{mache.id}</div>
                <div>Status:{mache.status}</div>
            </div>
        </>
    )
}