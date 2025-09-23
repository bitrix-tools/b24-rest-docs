# Как выполняется запрос

Как уже понятно из статьи про [авторизацию в REST API](./authorization.md), запрос к методу REST API - это HTTP-запрос по определенному адресу конкретного Битрикс24 вида

```http

https://your-domain.bitrix24.com/rest/method-name?param1=value1&param2=value2....

```

Большинство методов поддерживает передачу массива параметров в виде `POST`-запроса в формате `JSON`. Все методы поддерживают протокол `GET`, и `POST` в формате `multipart/form-data`.

В ответ на запрос, REST API возвращает результат в виде `JSON` или `XML` в зависимости от того что запросил пользователь, содержащим значимые данные или [информацию об ошибке](../../error-codes.md). Рекомендуем попробовать [выполнить простой запрос](../../first-steps/first-rest-api-call.md) перед тем, как вы начнете глубже знакомиться с REST API Битрикс24.

## Результат запроса

Формат ответа по-умолчанию - `JSON`, однако существует возможность получить ответ в формате `XML` если это необходимо.
Для этого к названию REST-метода необходимо добавить желаемый формат: `.json` или `.xml`. 

Обратите внимание на результат [batch](./batch.md) в обоих вариациях:

{% list tabs %}

- batch (json)

    Запрос:

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
            "halt": 0,
            "cmd": {
                "get_user": "user.current"
            }
        }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/batch
    ```
    
    Результат:

    ```json
    {
        "result": {
            "result": {
                "get_user": {
                    "ID": "1",
                    "ACTIVE": true,
                    "NAME": "Администратор",
                    "LAST_NAME": "Фьюжн",
                    "EMAIL": "info@efusion.ru",
                    "LAST_LOGIN": "2024-08-29T10:29:54+03:00",
                    "DATE_REGISTER": "2023-08-24T03:00:00+03:00",
                    "IS_ONLINE": "Y",
                    "TIMESTAMP_X": "24.08.2023 13:19:39",
                    "LAST_ACTIVITY_DATE": "2024-08-29 10:59:12",
                    "PERSONAL_GENDER": "",
                    "PERSONAL_BIRTHDAY": "",
                    "UF_EMPLOYMENT_DATE": "",
                    "UF_DEPARTMENT": [
                        1
                    ]
                }
            },
            "result_error": [],
            "result_total": [],
            "result_next": [],
            "result_time": {
                "get_user": {
                    "start": 1724918931.686765,
                    "finish": 1724918931.689633,
                    "duration": 0.0028679370880126953,
                    "processing": 0.0027151107788085938,
                    "date_start": "2024-08-29T11:08:51+03:00",
                    "date_finish": "2024-08-29T11:08:51+03:00"
                }
            }
        },
        "time": {
            "start": 1724918931.634301,
            "finish": 1724918931.689674,
            "duration": 0.05537295341491699,
            "processing": 0.0031290054321289062,
            "date_start": "2024-08-29T11:08:51+03:00",
            "date_finish": "2024-08-29T11:08:51+03:00"
        }
    }
    ```
- batch (xml)

    Запрос: 

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
            "halt": 0,
            "cmd": {
                "get_user": "user.current"
            }
        }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/batch.xml
    ```

    Результат:
    ```xml
    <response>
        <result>
            <result>
                <get_user>
                    <ID>1</ID>
                    <ACTIVE>1</ACTIVE>
                    <NAME>Администратор</NAME>
                    <LAST_NAME>Фьюжн</LAST_NAME>
                    <EMAIL>info@efusion.ru</EMAIL>
                    <LAST_LOGIN>2024-08-29T10:29:54+03:00</LAST_LOGIN>
                    <DATE_REGISTER>2023-08-24T03:00:00+03:00</DATE_REGISTER>
                    <IS_ONLINE>Y</IS_ONLINE>
                    <TIMESTAMP_X>24.08.2023 13:19:39</TIMESTAMP_X>
                    <LAST_ACTIVITY_DATE>2024-08-29 10:59:12</LAST_ACTIVITY_DATE>
                    <PERSONAL_GENDER></PERSONAL_GENDER>
                    <PERSONAL_BIRTHDAY></PERSONAL_BIRTHDAY>
                    <UF_EMPLOYMENT_DATE></UF_EMPLOYMENT_DATE>
                    <UF_DEPARTMENT>
                        <item>1</item>
                    </UF_DEPARTMENT>
                </get_user>
            </result>
            <result_error></result_error>
            <result_total></result_total>
            <result_next></result_next>
            <result_time>
                <get_user>
                    <start>1724918984.0348</start>
                    <finish>1724918984.0386</finish>
                    <duration>0.0037539005279541</duration>
                    <processing>0.0035719871520996</processing>
                    <date_start>2024-08-29T11:09:44+03:00</date_start>
                    <date_finish>2024-08-29T11:09:44+03:00</date_finish>
                </get_user>
            </result_time>
        </result>
        <time>
            <start>1724918983.9771</start>
            <finish>1724918984.0386</finish>
            <duration>0.06153392791748</duration>
            <processing>0.0040559768676758</processing>
            <date_start>2024-08-29T11:09:43+03:00</date_start>
            <date_finish>2024-08-29T11:09:44+03:00</date_finish>
        </time>
    </response>
    ```
{% endlist %}


{% note info %}

`JSON` является основным форматом ответа. Нет необходимости дописывать `.json` к названию каждого метода.

{% endnote %}