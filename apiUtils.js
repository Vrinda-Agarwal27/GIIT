// const axios = require('axios');

// async function getLoginToken() {
//     try {
//         const response = await axios.post('http://localhost/blue2/mediawiki/api.php', {
//             action: 'query',
//             meta: 'tokens',
//             type: 'login',
//             format: 'json'
//         });
//         return response.data.query.tokens.logintoken;
//     } catch (error) {
//         console.error('Error fetching login token:', error);
//         throw error;
//     }
//     var params_0 = {
//         action: "query",
//         meta: "tokens",
//         type: "login",
//         format: "json"
//     };

//     request.get({ url: url, qs: params_0 }, function (error, res, body) {
//         if (error) {
//             return;
//         }
//         var data = JSON.parse(body);
//         loginRequest(data.query.tokens.logintoken);
//     });
// }

// async function login(username, password) {
//     try {
//         const loginToken = await getLoginToken();
        
//         const loginResponse = await axios.post('http://localhost/blue2/mediawiki/api.php', {
//             action: 'login',
//             lgname: username,
//             lgpassword: password,
//             lgtoken: loginToken,
//             format: 'json'
//         }, {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         });

//         console.log('Login response:', loginResponse.data);
//     } catch (error) {
//         console.error('Error logging in:', error);
//     }
// }

// module.exports = {
//     login
// };
/*  
    edit.js
 
    MediaWiki API Demos
    Demo of `Login` module: Sending post request to login

    MIT license
*/

// var request = require('request').defaults({jar: true}),
//     url="http://localhost/blue2/mediawiki/api.php";
//     const axios = require('axios');
//     const qs = require('qs');
//     const tough = require('tough-cookie');
// const axiosCookieJarSupport = require('axios-cookiejar-support').default;

// axiosCookieJarSupport(axios);

// const cookieJar = new tough.CookieJar();
// // Step 1: GET Request to fetch login token
// async function getLoginToken() {
//     // var params_0 = {
//     //     action: "query",
//     //     meta: "tokens",
//     //     type: "login",
//     //     format: "json"
//     // };

//     // request.get({ url: url, qs: params_0 }, function (error, res, body) {
//     //     if (error) {
//     //         return;
//     //     }
//     //     var data = JSON.parse(body);
//     //     loginRequest(data.query.tokens.logintoken);
//     // });
//     try {
//         const response = await axios.post('http://localhost/blue2/mediawiki/api.php', qs.stringify({
//             action: 'query',
//             meta: 'tokens',
//             type: 'login',
//             format: 'json'
//         }), {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             withCredentials: true,
//             jar: cookieJar
//         });
//         return response.data.query.tokens.logintoken;
//     } catch (error) {
//         console.error('Error fetching login token:', error);
//         throw error;
//     }
// }

// // Step 2: POST Request to log in. 
// // Use of main account for login is not
// // supported. Obtain credentials via Special:BotPasswords
// // (https://www.mediawiki.org/wiki/Special:BotPasswords) for lgname & lgpassword
// async function loginRequest(username,password) {
//     // var params_1 = {
//     //     action: "login",
//     //     lgname: "Vrinda",
//     //     lgpassword: "HelloWorld123",
//     //     lgtoken: login_token,
//     //     format: "json"
//     // };

//     // request.post({ url: url, form: params_1 }, function (error, res, body) {
//     //     if (error) {
//     //         return;
//     //     }
//     //     console.log(body);
//     // });
//     try {
//         const loginToken = await getLoginToken();

//         const loginResponse = await axios.post('http://localhost/blue2/mediawiki/api.php', qs.stringify({
//             action: 'login',
//             lgname: username,
//             lgpassword: password,
//             lgtoken: loginToken,
//             format: 'json'
//         }), {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             withCredentials: true,
//             jar: cookieJar
//         });

//         console.log('Login response:', loginResponse.data);
//     } catch (error) {
//         console.error('Error logging in:', error);
//     }
// }
// module.exports = {
//     loginRequest
// };
// // Start From Step 1
// //getLoginToken();
const axios = require('axios');
const qs = require('qs');
const tough = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

const cookieJar = new tough.CookieJar();

const apiClient = wrapper(axios.create({
    baseURL: 'http://localhost/blue2/mediawiki/api.php',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true,
    jar: cookieJar
}));

async function getLoginToken() {
    try {
        const response = await apiClient.post('', qs.stringify({
            action: 'query',
            meta: 'tokens',
            type: 'login',
            format: 'json'
        }));
        return response.data.query.tokens.logintoken;
    } catch (error) {
        console.error('Error fetching login token:', error);
        throw error;
    }
}

async function loginRequest(username, password) {
    try {
        const loginToken = await getLoginToken();

        const loginResponse = await apiClient.post('', qs.stringify({
            action: 'login',
            lgname: username,
            lgpassword: password,
            lgtoken: loginToken,
            format: 'json'
        }));

        console.log('Login response:', loginResponse.data);

        const cookies = loginResponse.headers['set-cookie'];
        return { cookies, data: loginResponse.data };
        //return loginResponse.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}

module.exports = {
    loginRequest
};
