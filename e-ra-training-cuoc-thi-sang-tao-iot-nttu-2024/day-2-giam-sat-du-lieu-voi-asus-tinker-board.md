# Day 2: Giám sát dữ liệu Hệ thống cảm biến với ASUS Tinker Board kết hợp với bộ Kit Yolo UNO

**Bài giảng:**

{% file src="../.gitbook/assets/Training Day2_NTTU IoT Contest 2024.pdf" %}
Slide E-Ra Training Day 2
{% endfile %}

{% file src="../.gitbook/assets/Hướng dẫn lập trình với Yolo Uno.pdf" %}
Slide Hướng dẫn lập trình với Yolo UNO
{% endfile %}

{% embed url="https://youtu.be/gXeIzrBDHGM" %}
Video E-Ra Training Day 2
{% endembed %}

**Hướng dẫn thao tác lệnh:**

1. Tìm địa chỉ ip và token Tinker board
2. Online Tinker thông qua ssh
3. Online Tinker với code mới

\----------------------------------------------------

{% tabs %}
{% tab title="1. Tìm IP và Token" %}
**Tìm IP:** \
&#xNAN;_&#x4B;hởi động <mark style="color:orange;">**Tinker**</mark>_\
&#xNAN;_&#x4D;ở <mark style="color:orange;">**LXTerminal**</mark> (<mark style="color:orange;">Start menu</mark> > <mark style="color:orange;">System Tools</mark> > <mark style="color:orange;">LXTerminal</mark>)_\
&#xNAN;_<mark style="color:orange;">**Copy / paste lệnh**</mark>_

```
sudo ifconfig wlan0
```

<figure><img src="../.gitbook/assets/get-ip-edit.png" alt=""><figcaption></figcaption></figure>



**Tìm Token:**\
&#xNAN;_&#x56;ào web_ [_**https://app.e-ra.io/dev-mode/gateways**_](https://app.e-ra.io/dev-mode/gateways) _>_ _<mark style="color:orange;">**Gateway của mình**</mark>_ _>_ _<mark style="color:orange;">**Copy authtoken**</mark>_

<figure><img src="../.gitbook/assets/tinker-authtoken-off.png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="2. Online Tinker" %}
```
ssh linaro@<ip>
```

```
cd era-lib/linux
```

```
sudo ./era --token=<token>
```

* Mở <mark style="color:orange;">**Terminal**</mark> trên <mark style="color:orange;">**laptop**</mark>\
  mac: <mark style="color:orange;">**Cmd + Space**</mark> > <mark style="color:orange;">**gõ "terminal"**</mark> > <mark style="color:orange;">**enter**</mark>\
  win: <mark style="color:orange;">**Start menu**</mark> > <mark style="color:orange;">**gõ "cmd"**</mark> > <mark style="color:orange;">**enter**</mark>
* <mark style="color:orange;">**Copy / Paste**</mark> các <mark style="color:orange;">**lệnh trên**</mark>
* Thay <mark style="color:orange;">**ip**</mark> và <mark style="color:orange;">**token**</mark> tương ứng



_<mark style="color:orange;">**Ví dụ:**</mark>_

```
ssh linaro@<ip>
ssh linaro@192.168.1.72
```

```
sudo ./era --token=<token>
sudo ./era --token=111111-1111-1111-1111-11111111
```
{% endtab %}

{% tab title="3. Online Tinker với code mới" %}
<mark style="color:orange;">**Offline**</mark>**&#x20;Tinker:**

Thoát lệnh đang chạy với <mark style="color:orange;">**Ctrl + C**</mark>



<mark style="color:orange;">**Download**</mark>**&#x20;và&#x20;**<mark style="color:orange;">**Update**</mark>**&#x20;code mới**

```
cd ~
git clone https://github.com/eoh-jsc/eoh-asus-training.git
cd eoh-asus-training

cp main.cpp ~/era-lib/linux
cp ERaConsole.h ~/era-lib/linux/User/inc
cp ERaConsole.cpp ~/era-lib/linux/User/src
```



<mark style="color:orange;">**Build**</mark>**&#x20;code mới**

```
cd ~/era-lib/linux
make clean all target=tinker
```



<mark style="color:orange;">**Online**</mark>**&#x20;Tinker**

```
sudo ./era --token=<token>
```
{% endtab %}

{% tab title="4. Tùy biến" %}
1. **Với ASUS Tinker Board**

<mark style="color:orange;">**Download**</mark>**&#x20;và&#x20;**<mark style="color:orange;">**Update**</mark>**&#x20;code mới**

```
cd ~
git clone https://github.com/eoh-jsc/eoh-asus-training.git
cd eoh-asus-training

cp main.cpp ~/era-lib/linux
cp ERaConsole.h ~/era-lib/linux/User/inc
cp ERaConsole.cpp ~/era-lib/linux/User/src
```

Trong file <mark style="color:orange;">**main.cpp**</mark>

```cpp
// Trong hàm setup
void setup() {
    //...
    // Đăng ký chân V0 với mã lệnh "T"
    // Ví dụ: Khi Yolo gửi "!1:T:27.6#"
    // Thư viện sẽ tự động gửi 27.6 lên V0 E-Ra
    console.addCommand(V0, "T");
    //...
}
```

```cpp
// Trong hàm timerEvent
void timerEvent() {
    // ...
    // Mỗi một giây, Tinker Board sẽ gửi mã lệnh "T"
    // Yêu cầu Yolo gửi giá trị nhiệt độ
    // Với thời gian chờ là 100ms
    console.request("T", 100UL);
    // ...
}
```

```cpp
// Để lấy giá trị dùng hàm sau
float temperature = console.getValue("T");
```

<mark style="color:orange;">**Build**</mark> code mới

```
cd ~/era-lib/linux
make clean all target=tinker
```

2. **Với Yolo UNO**

<figure><img src="../.gitbook/assets/image (371).png" alt=""><figcaption></figcaption></figure>
{% endtab %}
{% endtabs %}
