import urlNode from 'url'
import aws4 from 'aws4'
import fetch from 'node-fetch'
import AWS from 'aws-sdk'

const sign = ({ method, url, headers: { region, ...headers }, body }) => {
  const { path, host } = urlNode.parse(url)
  return aws4.sign(
    {
      body,
      headers,
      method,
      url,
      service: 'execute-api',
      path,
      host,
      region
    },
    {
      accessKeyId: AWS.config.credentials.accessKeyId,
      secretAccessKey: AWS.config.credentials.secretAccessKey,
      sessionToken: AWS.config.credentials.sessionToken
    }
  )
}

export default async (url, options) => {
  const { method, headers, body } = options
  const signedRequest = await sign({ method, url, headers, body })
  return fetch(signedRequest.url, signedRequest)
}
