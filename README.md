--create module
module ini digunakan untuk menampung controller dan service
nest g module <module_name>

--create controller
nest g controller <module_name>


--create service
nest g service <module_name>


--nest g resource <module_name>
resource di sini akan auto generatekan berdasarkan template yang diinginkan, seperti REST

namafunc(@Param('id',ParseIntPipe) id:number) --> ini pipe buat otomatis parsing

untuk validator bisa pakai
class-validator class-transformer
zod, joi, etc