Assignment Mini Project Day 28
API testing menggunakan API Public reqres in

API

1. [Reqres ](https://reqres.in)

Daftar Library

1. [Lucide](https://lucide.dev/icons/coffee)
2. [Shadcn UI](https://ui.shadcn.com/)

Page

1. Login Page, gunakan Email : email: eve.holt@reqres.in , password : (Apa Saja)
2. Register Page, gunakan Email : email: eve.holt@reqres.in , password : (Apa Saja)
3. Homepage :

   1. Token Login sebagai Session.

      - Payload login, berupa token di simpan pada local storage beserta email.
      - Token sebagai alternative session, jika masuk ke halaman homepage tanpa token, maka akan force route ke halaman login lagi.

   2. Filter User Data sebagai user login pada sidebar footer.

      - Melakukan getData, memfilter berdasarkan email dari local storage untuk mengambil user data yang digunakan login.
      - Digunakan untuk menampilkan User Login pada bagian sidebar footer.
