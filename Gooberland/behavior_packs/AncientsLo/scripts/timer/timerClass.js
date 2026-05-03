// Remanxnce's Timer System (For Simple Timers!)
// Author: AG Remanxnce
// Project: Timer Class
//-------------------------------------------------------------------------

import {world, system} from "@minecraft/server"
/**
 *Create a timer to be used in-game.
 */
class Timer {
    /**
     * Create a timer.
     * @param {integer} time - The duration of time that the timer should last for.
     * @param {string} measurement - The measurement of time to use (default: seconds). Supports: [milliseconds, seconds, minutes, hours, days, weeks]
    * @returns {{initialTime:integer, measurement:string, began:integer, changed:integer, expiration:string }} The timer object.
     * @example 
     * Timer.set (10 ,"sec"); //seconds
     * Timer.set (10, "ms"); //milliseconds
     * Timer.set (5); //seconds
     * Timer.set (30, "min"); //minutes
     * Timer.set (1, "day"); // days
     * let timeHolder = Timer.set (1,"hour"); // hours
     */
    static set(time, measurement = 'sec') {
        this.#validate(time,measurement)
        const timeEnd = new Date();
        this.#handler(timeEnd, time, measurement);
        return {
            initialTime: time,
            measurement: measurement,
            began: Date.now(),
            changed: null,
            expiration: timeEnd
        };
    }

    /**
     * Increase the duration of an existing timer.
     * @param {object} timer - The existing timer object.
     * @param {integer} time - The amount of time to add to the timer.
     * @param {string} measurement - The measurement of time to use (default: seconds). Supports: [milliseconds, seconds, minutes, hours, days, weeks]
    * @returns {{initialTime:integer, measurement:string, began:integer, changed:integer, expiration:string }} The updated timer object.
     * @example
     * let timeHolder = Timer.set (1, "hour");
     * Timer.add (timeHolder, 10, "minutes"); //1 Hour 10 Minutes
     * Timer.add (timeHolder, 5, "hours"); //6 Hours
     * Timer.add (timeHolder, 1, "week"); //1 Week 1 Hour
     */
    static add(timer, time, measurement = 'sec') {
        this.#validate(time, measurement,timer)
        const timeEnd = new Date(timer.expiration);
        this.#handler(timeEnd, time, measurement);
        return {
            initialTime: timer.initialTime,
            measurement: timer.measurement,
            began: timer.began,
            changed: Date.now(),
            expiration: timeEnd
        };
    }    
    /**
    * Decrease the duration of an existing timer.
    * @param {object} timer - The existing timer object.
    * @param {integer} time - The amount of time to remove from the timer.
    * @param {string} measurement - The measurement of time to use (default: seconds). Supports: [milliseconds, seconds, minutes, hours, days, weeks]
    * @returns {{initialTime:integer, measurement:string, began:integer, changed:integer, expiration:string }} The updated timer object.
    * @example
    * let timeHolder = Timer.set(1, "hour");
    * Timer.remove (timeHolder, 30, "minutes"); //30 Minutes
    * Timer.remove (timeHolder, 10, "seconds"); //59 Minutes 50 Seconds
    * Timer.remove (timeHolder, 1, "hour"); //0 Seconds
    */
    static remove(timer, time ,measurement){
        this.#validate(time, measurement,timer)
        const timeEnd = new Date(timer.expiration);
        this.#handler(timeEnd, -Math.abs(time), measurement);
        return {
            initialTime: timer.initialTime,
            measurement: timer.measurement,
            began: timer.began,
            changed: Date.now(),
            expiration: timeEnd
        };
    }
    /**
    * Completely change a timer while still retaining other information.
    * @param {object} timer - The existing timer object.
    * @param {integer} time - The new amount of time on the timer.
    * @param {string} measurement - The measurement of time to use (default: seconds). Supports: [milliseconds, seconds, minutes, hours, days, weeks]
    * @returns {{initialTime:integer, measurement:string, began:integer, changed:integer, expiration:string }} The updated timer object.
    * @example
    * let timeHolder = Timer.set(1, "hour");
    * Timer.overwrite(timeHolder, 1, "Minute"); //1 Minute
    * Timer.overwrite(timeHolder, 10, "ms"); //10 Milliseconds
    * Timer.overwrite(timeHolder, 1, "weeks"); //1 Week
    */
   static overwrite(timer, time, measurement){
        this.#validate(time,measurement,timer)
        const timeEnd = new Date();
        this.#handler(timeEnd, time, measurement);
        return {
            initialTime: timer.initialTime,
            measurement: timer.measurement,
            began: timer.began,
            changed: Date.now(),
            expiration: timeEnd
        };
   }



   /**
    * Check if a certain amount of time has passed within a timer.
    * @param {object} timer - The timer object to check.
    * @param {Number} time - The amount of time to check.
    * @param {string} measurement - The measurement of time to use (default: seconds). Supports: [milliseconds, seconds, minutes, hours, days, weeks]
    * @returns {boolean} True || False
    * @example
    * let exTime = Timer.set(10,`sec`)
    
    *system.runInterval(()=>{
    *    console.warn(Timer.hasPassed(exTime, 3, `seconds`)),
    *},20) //false, false, false, true, true..
    */
   static hasPassed(timer, time, measurement){
    this.#validate(time, measurement, timer)
    const checkTime = new Date(timer.changed ?? timer.began);
    this.#handler(checkTime,time, measurement)
    return new Date() >= checkTime;
   }   
   /**
   * Check if a timer object has reached the end.
   * @param {object} timer - The timer object to check.
   * @returns {boolean} True || False
   * @example
   * let test = Timer.set(3,`sec`);

   *system.runInterval(()=>{
   *    console.warn(Timer.hasExpired(test)),
   *},20); //false, false, false, true, true..
   */
   static hasExpired(timer){
    const currentTime = Date.now();
    const expirationTime = new Date(timer.expiration).getTime();
    return currentTime >= expirationTime
   }
   /**
    * Check if a timer object has been modified after creation.
    * @param {object} timer - The timer object to check.
    * @returns {boolean} True || False
    * @example
    * let newTimer = Timer.set(10);
    * Timer.hasChanged(newTimer); //false
    * newTimer = timer.overwrite(newTimer, 3, `day`);
    * Timer.hasChanged(newTimer); //true
    */
   static hasChanged(timer){
    return timer.changed ? true : false
   }
   /**
    * Check how much time has passed since changing or creating a timer.
    * @param {object} timer - The timer object to check.
    * @returns {{rawTime: number, weeks: number, days: number, hours: number, minutes: number, seconds: number, milliseconds: number}} The breakdown of time.
    * @example
    * let newTimer = Timer.set(1,"minute");
    *system.runInterval(()=>{
    *   let format = Timer.format(newTimer)
    *   console.warn(format.minutes) //0,0,0..
    *   console.warn(format.seconds) //0,1,2..
    *},20); 
    */
   static elapsed(timer){
    let started = timer.changed ?? timer.began
    return this.#format(Date.now() - started)
   }
   /**
    * Check how long until a timer expires.
    * @param {object} timer - The timer object to check.
    * @returns {{rawTime: number, weeks: number, days: number, hours: number, minutes: number, seconds: number, milliseconds: number}} The breakdown of time.
    *@example
    *let newTimer = Timer.set(1,"minute");
    *system.runInterval(()=>{
    *   let format = Timer.format(newTimer)
    *   console.warn(format.minutes) //1,0,0..
    *   console.warn(format.seconds) //0,59,58..
    *},20); 
    */
   static remaining(timer){
    let expiration = timer.expiration
    return this.#format(expiration - Date.now())
   }
    /**
    * Check how long has passed since a given timestamp.
    * @param {integer} timestamp - the timestamp to check.
    * @returns {{rawTime: number, weeks: number, days: number, hours: number, minutes: number, seconds: number, milliseconds: number}} The breakdown of time.
    *@example
    *world.setDynamicProperty(`timer`,Date.now());
    *system.runInterval(()=>{
    *   let format = world.getDynamicProperty(`timer`)
    *   console.warn(Timer.get(format).seconds)
    *},20); //0,1,2,3..
    */
   static get(timeStamp){
        if (!Number.isInteger(timeStamp)) throw new Error (`Timestamp must be integer type`)
        return this.#format(Date.now() - timeStamp)
   }
   static #format(value){
    return {
        rawTime: value,
        weeks: Math.floor(value / (1000 * 60 * 60 * 24 ) % 7),
        days: Math.floor(value / (1000 * 60 * 60 * 24)),
        hours: Math.floor((value / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((value / (1000 * 60)) % 60),
        seconds: Math.floor((value / 1000) % 60),
        milliseconds: Math.floor((value % 1000)),
    }
   }

    static #handler(date, time, measurement) {
        switch (measurement.toLowerCase()) {
            case 'weeks':
            case 'week':
                date.setDate(date.getDate() + (time * 7));
                break;
            case 'days':
            case 'day':
                date.setDate(date.getDate() + time);
                break;
            case 'hours':
            case 'hour':
                date.setHours(date.getHours() + time);
                break;
            case 'minutes':
            case 'min':
                date.setMinutes(date.getMinutes() + time);
                break;
            case 'seconds':
            case 'sec':
                date.setSeconds(date.getSeconds() + time);
                break;
            case 'milliseconds':
            case 'ms':
                date.setMilliseconds(date.getMilliseconds() + time);
                break;
            default:
                throw new Error('Unsupported time measurement');
        }
    }
    static #validate(time, measurement,timer = `Ignored`){
        if (timer !== 'Ignored' && (typeof timer !== 'object' || timer === null)) throw new Error('Timer must be an object type');
        if (!Number.isInteger(time) || time === null) throw new Error('Time must be integer type');
        if (typeof measurement != `string` || measurement === null) throw new Error(`Measurement must be string type`)
    }
}
globalThis.Timer = Timer;

export default Timer;