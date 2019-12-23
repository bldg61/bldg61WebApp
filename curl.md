* `curl -X POST -H "Content-Type: application/json" -d '{"client_id":"LIBCAL_CLIENT_ID", "client_secret": "LIBCAL_CLIENT_SECRET", "grant_type": "client_credentials"}' https://calendar.boulderlibrary.org/1.1/oauth/token`
* `curl -H "Authorization: Bearer ACCESS_TOKEN_FROM_AUTH"  https://calendar.boulderlibrary.org/1.1/events?cal_id=CAL_ID`
