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
	postFormData(url, formData) {
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
	  
	patch(url, data) {
		return this.#makeRequest(url, {
			headers: {//указывается что именно json
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			method: 'PATCH'
		})
	}

	patchFormData(url, formData) {
		return fetch(this.#apiPath + url, {
		  body: formData,
		  method: 'PATCH'
		}).then(res => res.json());
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

