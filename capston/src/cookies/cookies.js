import {Cookies} from 'react-cookie'

const cookies = new Cookies();

/**
 * 쿠키값 설정하는 함수
 * @param {string} name 저장할 쿠키 이름 
 * @param {string} value 저장할 쿠키 값 
 * @param {*} options 옵션값(저장경로, 만료시간) ex. {path: '/', expires}
 * @returns 
 */
export const setCookie = (name, value, options)=>{
	return cookies.set(name, value, {...options})
}

/**
 * 쿠키값 받아오는 함수 
 * @param {string} name 받아올 쿠키 이름 
 * @returns 
 */
export const getCookie = (name)=>{
	return cookies.get(name)
}