# Выполнение пакета запросов

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% note info "Права" %}

**Права на выполнение**: для всех

{% endnote %}

## Описание

Выполнение пакета запросов.

В некоторых случаях возникает необходимость отправить несколько запросов подряд. Для оптимизации процесса можно использовать пакетное выполнение запросов.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **halt** | Определяет прерывать ли последовательность запросов в случае ошибки. ||
|| **cmd** | Массив запросов стандартного вида (следует помнить про квотирование данных запросов; получается, что данные для подзапросов должны пройти двойное квотирование). ||
|#

{% note info %}

Количество запросов в пакете ограничено 50.

{% endnote %}

Массив запросов может быть как с числовыми ключами, так и ассоциативным. В параметрах каждого последующего запроса можно использовать данные предыдущих запросов в таком виде:

```php

$result[идентификатор_запроса][поле_ответа]

```

где идентификатором запроса служит его ключ в массиве запросов.

С версии **rest 24.0.0** для метода `batch` запрещена вложенность (при вызове метода `batch` нельзя вызывать внутри другой `batch`).

## Пример

Запрос

```http

https://your-domain.bitrix24.com/rest/batch.xml?auth=d161f25928c3184678924ec127edd29a&halt=0&cmd[get_user]=user.current%3F&cmd[get_department]=department.get%3FID%3D%2524result%255Bget_user%255D%255BUF_DEPARTMENT%255D

```

{% note info %}

**Обратите внимание**, что параметры URL-кодированы. Рекомендация кодировать параметры - обязательна, в противном случае корректность результата не гарантируется.

{% endnote %}

Ответ XML

```xml
<response>
    <result>
        <result>
            <get_user>
                <ID>1</ID>
                <LOGIN>admin</LOGIN>
                <ACTIVE>1</ACTIVE>
                <EMAIL>my@example.com</EMAIL>
                <NAME>John Dou</NAME>
                <LAST_NAME/>
                <SECOND_NAME/>
                <PERSONAL_GENDER/>
                <PERSONAL_PROFESSION/>
                <PERSONAL_WWW/>
                <PERSONAL_BIRTHDAY>1955-04-10T00:00:00+03:00</PERSONAL_BIRTHDAY>
                <PERSONAL_PHOTO>/upload/main/80c/44169_C5_PrimalWaterE500CC.jpg</PERSONAL_PHOTO>
                <PERSONAL_ICQ/>
                <PERSONAL_PHONE/>
                <PERSONAL_FAX/>
                <PERSONAL_MOBILE/>
                <PERSONAL_PAGER/>
                <PERSONAL_STREET/>
                <PERSONAL_CITY/>
                <PERSONAL_STATE/>
                <PERSONAL_ZIP/>
                <PERSONAL_COUNTRY>0</PERSONAL_COUNTRY>
                <WORK_COMPANY/>
                <WORK_POSITION/>
                <UF_DEPARTMENT>
                <item>128</item>
                </UF_DEPARTMENT>
                <UF_INTERESTS/>
                <UF_SKILLS/>
                <UF_WEB_SITES/>
                <UF_XING/>
                <UF_LINKEDIN/>
                <UF_FACEBOOK/>
                <UF_TWITTER/>
                <UF_SKYPE/>
                <UF_DISTRICT/>
                <UF_PHONE_INNER/>
            </get_user>
            <get_department>
                <item>
                    <ID>128</ID>
                    <NAME>IT-department</NAME>
                    <SORT>500</SORT>
                    <PARENT>114</PARENT>
                    <UF_HEAD>255</UF_HEAD>
                </item>
            </get_department>
        </result>
        <result_error/>
        <result_total>
            <get_department>1</get_department>
        </result_total>
        <result_next/>
    </result>
</response>
```

Запросы, выполняемые пакетом batch, могут использовать данные, полученные предыдущими запросами, поскольку выполняются последовательно. 

Например,

```js

BX24.callMethod(
    'batch',
    {
        'halt': 0,
        'cmd': {
            'user': 'user.get?ID=1',
            'first_lead': 'crm.lead.add?fields[TITLE]=Test Title',
            'user_by_name': 'user.search?NAME=Test2',
            'user_lead': 'crm.lead.add?fields[TITLE]=Test Assigned&fields[ASSIGNED_BY_ID]=$result[user_by_name][0][ID]',
        }
    },
    function(result)
    {
        console.log(result.answer);
    }
);

```

В результате:

- `user` - вернёт пользователя с ID = 1
- `first_lead` - создаст лид
- `user_by_name` - найдёт пользователя с именем "Test2"
- `user_lead` - создаст лид с ответственным пользователем, найденным в user_by_name

В [SDK CRest PHP](../crest-php-sdk/) рекомендуется использовать [CRest::callBatch()](https://github.com/bitrix-tools/crest)

В [SDK BX24.js] нужно использовать метод [BX24.callBatch](../bx24-js-sdk/how-to-call-rest-methods/bx24-call-batch.md)