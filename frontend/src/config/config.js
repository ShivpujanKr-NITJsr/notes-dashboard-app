const env = import.meta.env.NODE_ENV || "LOCAL"; // Set the environment variable here

// "PROD" ,"DEV", "LOCAL"

export const local_url="http://localhost";
export const local_port="5500";

export const prod_url="https";
export const prod_port="//smart-notes-dashboard-app.onrender.com";

export const dev_url="http://localhost";
export const dev_port="5500";

export const version = 'v1'; // Set the API version here

//https://smart-notes-dashboard-app.onrender.com/

export const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// backend url
export const url = env=="PROD"? prod_url:env=="DEV"?dev_url:local_url;

//backend port
export const port = env=="PROD"? prod_port:env=="DEV"?dev_port:local_port;

export const LINK=`${url}:${port}/api/${version}`; // Set the API base URL here