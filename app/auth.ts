import { DynamoDB, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import NextAuth from "next-auth"
import SendGrid from 'next-auth/providers/sendgrid'
import { DynamoDBAdapter } from '@auth/dynamodb-adapter'

const config: DynamoDBClientConfig = {
  credentials: {
    accessKeyId: process.env.DYNAMODB_ID!,
    secretAccessKey: process.env.DYNAMODB_SECRET!,
  },
  region: process.env.DYNAMODB_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
}

export const dynamoClient = DynamoDBDocument.from(new DynamoDB(config), {
  marshallOptions: {
    convertEmptyValues: true,
    removeUndefinedValues: true,
    convertClassInstanceToMap: true,
  },
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [SendGrid({
    from: process.env.AUTH_SENDGRID_FROM,
  })],
  adapter: DynamoDBAdapter(dynamoClient),
})