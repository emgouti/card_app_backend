const result = dotenv.config()
 
if (result.error) {
  throw result.error
}
 
console.log(result.parsed)



// const env = process.env;

// export const mongo = env('MONGO_URL') || 'development'

// export default {
//     mongodbUri: mongo,
//     port: env.PORT || 3000,
//     host: env.HOST || '0.0.0.0',
//     get serverUrl() {
//         return `http://${this.host}:${this.port}`;
//     }
// }