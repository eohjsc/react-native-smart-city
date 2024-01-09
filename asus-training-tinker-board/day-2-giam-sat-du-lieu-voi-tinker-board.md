# Day 2: giám sát dữ liệu với Tinker board

1. Tìm địa chỉ ip Tinker board
2. Online Tinker board thông qua ssh
3. Cập nhật code mới, gửi dữ liệu lên E-Ra



**Cấp nguồn / khởi động **<mark style="color:orange;">**Tinker**</mark>**, mở màn hình và **<mark style="color:orange;">**gõ lệnh**</mark>

```
sudo ifconfig wlan0
```



{% tabs %}
{% tab title="Online Tinker" %}
#### Truy cập <mark style="color:orange;">Tinker</mark> thông qua <mark style="color:orange;">ssh</mark>

```
ssh linaro@<ip>
cd era-lib/linux
sudo ./era --token=<token> --host=mqtt1.eoh.io
```
{% endtab %}

{% tab title="Code chuẩn bị sẵn và Online Tinker" %}
#### Code đọc dữ liệu từ <mark style="color:orange;">YoloUno</mark> và <mark style="color:orange;">gửi lên E-Ra</mark>, thông qua <mark style="color:orange;">Virtual Pin</mark> V0 / V1 / V2.

_tải và giải nén Tinker\_2024.rar, được thư mục Tinker\_2024_

{% file src="../.gitbook/assets/Tinker_2024.rar" %}

#### Cập nhật file <mark style="color:orange;">code chuẩn bị sẵn</mark> vào <mark style="color:orange;">Tinker</mark> thông qua <mark style="color:orange;">sftp</mark>

{% code overflow="wrap" %}
```
sftp linaro@<ip>
lcd ~/Downloads/Tinker_2024
cd era-lib/linux

put main.cpp
put ERaConsole.h User/inc
put ERaConsole.cpp User/src
```
{% endcode %}



#### Truy cập <mark style="color:orange;">Tinker</mark> thông qua <mark style="color:orange;">ssh</mark>

<pre><code>ssh linaro@<a data-footnote-ref href="#user-content-fn-1">&#x3C;ip></a>
cd era-lib/linux
</code></pre>

<mark style="color:orange;">build</mark> lại với đoạn <mark style="color:orange;">code mới</mark>

```
make clean all target=tinker
```

```
sudo ./era --token=<token> --host=mqtt1.eoh.io
```
{% endtab %}
{% endtabs %}

_- thay **\<ip>** tương ứng_\
_- thay <**token>** tương ứng_



_<mark style="color:orange;">**Ví dụ:**</mark>_

```
ssh linaro@<ip>
ssh linaro@192.168.1.2
```

```
sudo ./era --token=<token> --host=mqtt1.eoh.io
sudo ./era --token=111111-1111-1111-1111-11111111 --host=mqtt1.eoh.io
```



[^1]: 