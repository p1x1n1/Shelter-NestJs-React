export class ApiService {
	#apiPath = `http://localhost:3001`;//приватное поле #

	#makeRequest(url, options) {
		return fetch(this.#apiPath + url, options).then(res => res.json())
	}

	get(url) {
		console.log(this.#apiPath);
		return this.#makeRequest(url, { 
			method: 'GET' 
		})
	}


	delete(url) {
		return this.#makeRequest(url, { method: 'DELETE' })
	}

	post(url, data) {
		return this.#makeRequest(url, {
			headers: {//указывается что именно json
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			method: 'POST'
		})
	}
	postformData(url, formData) {
		return this.#makeRequest(url, {
		  body: formData,
		  method: 'POST'
		});
	  }

	put(url, data) {
		return this.#makeRequest(url, {
			headers: {//указывается что именно json
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			method: 'PUT'
		})
	}
	  
	async getUserInfo(token) {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`, // Передаем токен в заголовке
            },
        };
        return this.#makeRequest('/auth/user-info', options); 
    }
}

