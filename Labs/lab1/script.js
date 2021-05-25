'use strict';

const fibbonachi = () => {
	let f = document.getElementById("fibonacci")
	//console.log(typeof f.value)
	if (!Number.isInteger(+f.value))
		return
	
	let sum_f = [0, 1]
	if (f.value <= 1)
		sum_f = [0]
	else
		for(let i=0; i < f.value - 2; i++)
			sum_f.push(sum_f[sum_f.length-1] + sum_f[sum_f.length-2])

	document.getElementById('f_result').innerHTML = sum_f.join(', ')
}

const elevator = () => {
	let n = document.getElementById("elevator1").value
	let f_exp = document.getElementById("elevator2").value

	let result = ''

	if (n <= 0 || f_exp <= 0 || +f_exp > +n || n == '' || f_exp == '') {}
	else {
		let f_rl = f_exp % 2 != 0 ? f_exp : (f_exp == n ? f_exp - 1 : f_exp + 1)
		if (f_rl > f_exp) result = 'Down'
		else if (f_rl < f_exp) result = 'Up'
		else result = 'Stay'
	}

	document.getElementById('e_result').innerHTML = result
}

const Rarray = () => {
	let n = document.getElementById("arr1").value
	let m = document.getElementById("arr2").value
	let length = n*m;

	let pos = []
	let neg = []

	let arr = []

	for(let i = 0; i < n; i++){
		arr.push([])
		for(let j = 0; j < m; j++){
			let r = Math.floor(Math.random() * 2000 - 1000)
			console.log(r)
			arr[i].push(r)

		}
	}
	
	if (n <=0 || m <= 0) {}
	else {
		for(let i = 0; i < n; i++) {
			for(let j = 0; j < m; j++){
			let r = arr[i][j]
			//console.log(r)
			if (r > 0) pos.push(r)
			else if (r < 0) neg.push(r)
			}
		}
	}

	document.getElementById('arr_result').innerHTML = pos.join(', ') + " <b>||</b> " + neg.join(', ')
}

let g = ['IT-92','IT-91','IT-93','IT-94']
let groupsL = document.getElementById('groupsList')

groupsL.innerHTML = ''

g.forEach(e => {
	groupsL.innerHTML += `<option value="${e}">${e}</option>\n`
})

let scheduleArr = [
	{name: 'Math', group: [g[0],g[2]], day: 'monday', time: '10:25', cab: '311'},
	{name: 'English', group: [g[2]], day: 'wednesday', time: '8:30', cab: '426'},
	{name: 'Data Analysis', group: [g[0]], day: 'tuesday', time: '8:30', cab: '310'},
	{name: 'Backend', group: [g[0],g[3]], day: 'tuesday', time: '10:25', cab: '418'},
	{name: 'Software Engineering', group: [g[1],g[3]], day: 'friday', time: '12:20', cab: '516'},
	{name: 'Node.js', group: [g[1],g[0]], day: 'thursday', time: '10:25', cab: '419'},
]

const Schedule = () => {
	//console.log(groupsL.value)
	let date = document.getElementById('s_date').value
	let group = groupsL.value

	let result = ''
	let day = (new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(new Date(date))).toLowerCase()
	let dayArr = []

	scheduleArr.forEach(e => {
		if (e.group.includes(group) && e.day == day)
			dayArr.push(e)
	})
	
	dayArr.sort((item_a, item_b) => {
		let time_a = Date.parse(`01/01/2011 ${item_a.time}`)
		let time_b = Date.parse(`01/01/2011 ${item_b.time}`)
		if (time_a > time_b) return 1
		if (time_a < time_b) return -1
		return 0
	})

	dayArr.forEach((e) => {
		result += `<p>${e.name}, ${e.time}, ${e.cab}</p>`
	})

	document.getElementById('s_result').innerHTML = result
}

let items_table = []

const TableAdd = () => {
	let name = document.getElementById('item1').value
	let price = document.getElementById('item2').value
	let quantity = document.getElementById('item3').value

	items_table.push({name: name, price: price, quantity: quantity})
	alert("Added")
}

const TableUpdate = () => {
	let result = ''
	let sum_p = 0
	items_table.forEach((e)=> {
		let full_p = e.quantity*e.price
		sum_p += full_p
		result += `<tr><td>${e.name}</td><td>${e.price}</td><td>${e.quantity}</td><td>${full_p}</td></tr>`
	})

	document.getElementById('i_result').innerHTML = result + `<tr><td></td><td></td><td></td><td>${sum_p}</td></tr>`
}

const C_SetVal = (x) => {
	let a = document.getElementById('val_a').value
	let b = document.getElementById('val_b').value

	if (Number.isNaN(+a) || Number.isNaN(+b))
		return
	x(+a,+b)
}

const C_Add = (a,b) => {
		document.getElementById('c_result').innerHTML = `${a+b}`
}

const C_Subtract = (a,b) => {
		document.getElementById('c_result').innerHTML = `${a-b}`
}

const C_Mul = (a,b) => {
		document.getElementById('c_result').innerHTML = `${a*b}`
}

const C_Div = (a,b) => {
		document.getElementById('c_result').innerHTML = `${a/b}`
}

let weatherData = [
	{temperature:-21, fall_out: 21, wind: 3.4, date:'2021-02-11'},
	{temperature:-17, fall_out: 31, wind: 1.2, date:'2021-02-12'},
	{temperature:-16, fall_out: 6, wind: 0.4, date:'2021-02-13'},
	{temperature:-7, fall_out: 11, wind: 0.5, date:'2021-02-14'},
	{temperature:-11, fall_out: 2, wind: 1.1, date:'2021-02-16'},
	{temperature:-21, fall_out: 32, wind: 2.1, date:'2021-02-17'},
	{temperature:-17, fall_out: 25, wind: 1.8, date:'2021-02-19'},
	{temperature:-14, fall_out: 12, wind: 1.4, date:'2021-02-20'},
	{temperature:-18, fall_out: 17, wind: 2.7, date:'2021-02-22'},
	{temperature:-11, fall_out: 9, wind: 2.3, date:'2021-02-23'},
	{temperature:-11, fall_out: 7, wind: 1.2, date:'2021-02-24'},
	{temperature:-14, fall_out: 10, wind: 1.5, date:'2021-02-25'},
	{temperature:-8, fall_out: 9, wind: 0.9, date:'2021-02-26'}
	
]

const Weather = () => {
	let date_a = new Date(document.getElementById('weather1').value)
	let date_b = new Date(document.getElementById('weather2').value)

	let result = [0,0]
	let i = 0

	weatherData.forEach((e) => {
		let t = new Date(e.date)
		
		if (date_a <= t && t <= date_b)
		{
			i++
			result[0] += e.temperature
			result[1] += e.fall_out
		}
	})
	result = `${result[0]/i}, ${result[1]}`

	document.getElementById('w_result').innerHTML = result
}