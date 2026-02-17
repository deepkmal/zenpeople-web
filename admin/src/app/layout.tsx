import type { ServerFunctionClient } from 'payload'
import type { Metadata } from 'next'
import '@payloadcms/next/css'
import './globals.css'

import config from '@/payload.config'
import { handleServerFunctions, RootLayout as PayloadRootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './(payload)/admin/importMap'

export const metadata: Metadata = {
  title: 'Zenpeople Admin',
  description: 'Zenpeople CMS Admin Panel',
}

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const RootLayout = ({ children }: Args) => (
  <PayloadRootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </PayloadRootLayout>
)

export default RootLayout
