import React from 'react'
import PropTypes from 'prop-types'
import './css/main.css'

const daysRu = ["Воскресенье","Понедельник" , "Вторник" , "Среда" , "Четверг" , "Пятница" , "Суббота"]
const monthsRu = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Ноябрь","Декабрь"];
const monthsRuAdd = ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Ноября","Декабря"];

function Calendar(props) {

    const date = props.date

    const day = date.getDate()
    
    const weekDay = date.getDay();
    const weekDayRu = daysRu[weekDay]
    const month = date.getMonth();
    const monthRu = monthsRu[month]
    const monthRuAdd = monthsRuAdd[month]
    const year = date.getFullYear();
    
    const startDayMonth = new Date(year, month, 1);
    const startDayMonthCount = startDayMonth.getDay()

    let startDayCalendar;
    let deltaStart;
    if(startDayMonthCount === 1) {
        startDayCalendar = startDayMonth
    } else {
        if(startDayMonthCount > 1) {
            deltaStart = startDayMonthCount - 2;
        } else {
            deltaStart = 5;
        }
        startDayCalendar = new Date(year, month, -deltaStart)
    }
    
    const endDayMonth = new Date(year, month + 1, 0);
    const endDayMonthCount = endDayMonth.getDay()
    let deltaEnd;
    if(endDayMonthCount === 0) {
        deltaEnd = -1
    } else {
        deltaEnd = 6-endDayMonth.getDay()
    }

    const delta = startDayMonthCount + endDayMonth.getDate() + deltaEnd;

    let days = [];
    let dayCounter = startDayCalendar;
    let j = 1;
    days[j] = [];
    
    for (let i = 1; i <= delta; i++) {         
        days[j][i] = [];
        days[j][i]['day'] = dayCounter.getDate()        
        days[j][i]['month'] = dayCounter.getMonth() 
        if(days[j][i]['month'] !== month) {
            days[j][i]['class'] = 'ui-datepicker-other-month'
        }
        if((days[j][i]['month'] === month)&&(days[j][i]['day'] === day)) {
            days[j][i]['class'] = 'ui-datepicker-today'
        }
        dayCounter.setDate(dayCounter.getDate()+1);        
        if((i%7) === 0) { j++; days[j] = []; }
    }
    
    const calendarDays = days.map((weekitem,index) =>
        <tr key={index}>
            {weekitem.map((dayitem,idx) =>
            <td className={dayitem.class} key={idx}>{dayitem.day}</td>
            )}
        </tr>
    ) 

    return (
        <div className="ui-datepicker">            
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{weekDayRu}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{day}</div>
                    <div className="ui-datepicker-material-month">{monthRuAdd}</div>
                    <div className="ui-datepicker-material-year"></div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                <span className="ui-datepicker-month">{monthRu}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col className="ui-datepicker-week-end"/>
                    <col className="ui-datepicker-week-end"/>
                </colgroup>
                <thead>
                <tr>
                    <th scope="col" title="Понедельник">Пн</th>
                    <th scope="col" title="Вторник">Вт</th>
                    <th scope="col" title="Среда">Ср</th>
                    <th scope="col" title="Четверг">Чт</th>
                    <th scope="col" title="Пятница">Пт</th>
                    <th scope="col" title="Суббота">Сб</th>
                    <th scope="col" title="Воскресенье">Вс</th>
                </tr>
                </thead>
                <tbody>
                    {calendarDays}                
                </tbody>
            </table>
        </div>
    )
}

Calendar.propTypes = {
    date: PropTypes.instanceOf(Date)
}

export default Calendar

