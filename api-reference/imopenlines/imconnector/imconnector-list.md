# Получить список коннекторов imconnector.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- из файла Сергея: обращаем внимание, что здесь возвращается полный список подключенных на текущем б24 коннекторов
- не указаны параметры
- не указана обязательность параметров
- отсутствуют примеры на др.языках

{% endnote %}

{% endif %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает список коннекторов.

## Пример

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'imconnector.list',
        {},
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('imconnector.list', {}, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('imconnector.list', {}, 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imconnector.list',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error()->ex;
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling imconnector.list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('imconnector.list', {}, function(result) {
        if(result.error())
        {
            console.error(result.error().ex);
        }
        else
        {
            console.log(result.data());
        }
    });
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

Список коннекторов с названиями.

```json
{
    "livechat": "Онлайн-чат",
    "whatsappbytwilio": "WhatsApp",
    "avito": "Avito",
    "viber": "Viber",
    "telegrambot": "Telegram",
    "imessage": "Apple Messages for Business",
    "vkgroup": "ВКонтакте",
    "ok": "Одноклассники",
    "facebook": "Facebook*: Сообщения",
    "facebookcomments": "Facebook*: Комментарии",
    "fbinstagramdirect": "Instagram* Direct",
    "network": "Битрикс24.Network",
    "notifications": "Битрикс24 СМС и WhatsApp",
    "whatsappbyedna": "Edna.ru WhatsApp",
    "newcustomconnector": "new super COnnector"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **ACCESS_DENIED** | У текущего пользователя нет доступа ||
|#
