# HTTP Notification Provider Contest

## Motivation
Free TON holders need a module that provides notifications transmission via the HTTP protocol for interactive applications, online stores, IOT and other consumers. At the same time, anonymity of the blockchain users must be ensured.

## General architecture
In order to ensure the anonymity of blockchain users, a separation has been made between the blockchain data and the addresses of the recipients of this data. For this, the following modules are introduced:

   * Queue Provider - knows what to send (data itself). It doesn’t have any information about the real world address of the recipient. It allows the user to configure an event source based on the following parameters:  “Account address” and its message types: internal / external In / external Out. Queue provider forwards prepared and encrypted messages to Notification provider. Each message contains a key by which the Notification provider - can match the corresponding recipient.

   * Notification Providers - knows where to send (HTTP REST API). It doesn’t have any information about the data. It receives and sends the data encrypted

## We suggest two different solutions that can be tested. They are uploaded to their respective folders inside this repository.
