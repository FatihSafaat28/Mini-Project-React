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

      - Melakukan getLoginData untuk mengambil seluruh data (dengan per_Page =12 akan menampilkan seluruh data), lalu melakukan filter berdasarkan email dari local storage untuk mengambil user data yang digunakan login.
      - Digunakan untuk menampilkan User Login pada bagian sidebar footer.

   3. Get User List, Fitur Show Per Page, dan Pagination

      - Show per pages dengan value [3,6,9,12] dan Pagination otomatis menyesuaikan jumlahnya berdasarkan total_pages yang berubah berdasarkan per_pages nya.

   4. Dynamic Routing untuk single user

      - Membuat /homepage/[id] untuk membuat dynamic routing. Mengirim dan Menangkap id dengan useRouter.

**FIX**
1. Memperbaiki pagination, ketika _show page_ diubah, page berubah otomatis ke page 1.
2. Memperbaiki Login dan Register menjadi Single Page.
3. Memperbaiki Struktur File dengan menggunakan layout.

**ADD**
1. Menambahkan Fitur Dark mode and Light Mode.
