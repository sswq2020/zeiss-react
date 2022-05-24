import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getList } from "../../http"
import MacheItem, { MacheItemStatus } from "../../types"
import { createChildElementRectMap, getTimeStamp } from "../../untils/index"
import styles from './index.module.css'

export default function DashBoard() {
    const [data, setData] = useState<MacheItem[]>([])
    const listRef = useRef<HTMLDivElement>(null)
    const lastRectRef = useRef<Map<HTMLElement, DOMRect>>(new Map())
    const navigate = useNavigate();

    useEffect(() => {
        fetchList()
    }, [])

    useLayoutEffect(() => {
        const currentRectMap = createChildElementRectMap(listRef.current);
        lastRectRef.current.forEach((prevRect, node) => {
            const currentRect = currentRectMap.get(node);
            const invert = {
                left: prevRect.left - currentRect.left,
                top: prevRect.top - currentRect.top
            }

            const keyframes = [
                {
                    transform: `translate(${invert.left}px,${invert.top}px)`
                },
                {
                    transform: 'translate(0,0)'
                }
            ]

            node.animate(keyframes, {
                duration: 800,
                easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
            });
        })
    }, [data])

    const sortByTime = () => {
        setData(prev => {
            return [...prev.sort((a, b) => getTimeStamp(a.install_date) - getTimeStamp(b.install_date))]
        }
        )
        lastRectRef.current = createChildElementRectMap(listRef.current);
    }

    const sortByStatus = () => {
        setData(prev => {
            return [...prev.sort((a, b) => displayOrderByStatus(a.status) - displayOrderByStatus(b.status))]
        }
        )
        lastRectRef.current = createChildElementRectMap(listRef.current);
    }

    const displayOrderByStatus = (status: MacheItemStatus) => {
        return {
            finished: 0,
            running: 1,
            repaired: 2,
            idle: 3,
            errored: 4,
        }[status]
    }

    const fetchList = async () => {
        const res = await getList()
        setData(res);
    }

    const ClassStatus = (status: MacheItemStatus) => {
        return {
            finished: styles.finshStatus,
            running: styles.runningStatus,
            errored: styles.errorStatus,
            repaired: styles.repairedStatus,
            idle: styles.idleStatus
        }[status]
    }

    const GotoDetail = (obj: MacheItem) => {
        navigate(`/detail/${obj.id}`, { replace: true });
    }

    return (
        <>

            {
                data && Array.isArray(data) && data.length === 0 && <div className={styles.loading}><span>Loading...</span></div>
            }
            {
                data && Array.isArray(data) && data.length > 0 &&
                <>
                    <div className={styles.main} ref={listRef}>
                        {data.map((item) => (
                            <div key={item.id} className={styles.item} onClick={() => GotoDetail(item)}>
                                Machine_Id ---- <span className={styles.primaryColor}>{item.id}</span> ----status---- <span className={ClassStatus(item.status)}>{item.status}</span> ----Install Time----<span className={ClassStatus(item.status)}>{item.install_date}</span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.sortmenu}>
                        <button onClick={sortByTime} className={styles.sortButton}>Sort By Time</button>
                        <button onClick={sortByStatus} className={styles.sortButton}>Sort By Status</button>
                    </div>
                </>
            }
        </>
    )
}