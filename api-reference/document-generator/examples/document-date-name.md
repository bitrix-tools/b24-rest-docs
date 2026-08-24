# Сгенерировать документ с модификаторами даты и имени

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на создание документов

Модификаторы в шаблонах документов — это правила форматирования, которые управляют тем, как выводятся значения полей, например дата или ФИО.

Входные данные можно заранее отформатировать в приложении, а можно передать форматирование через REST.

## Когда использовать

- Нужно отформатировать дату средствами генератора документов
- Нужно вывести ФИО в заданном формате
- Нужно вывести русское имя в нужном падеже

## Что передавать в запросе

Модификаторы даты и имени применяются к значениям плейсхолдеров шаблона через параметры `values` и `fields` метода [documentgenerator.document.add](../document-generator-document-add.md). Кроме них в запросе обязательны `templateId` — идентификатор шаблона и `value` — внешний идентификатор объекта.

{% note tip "Пользовательская документация" %}

- [Что такое модификаторы в шаблонах документов](https://helpdesk.bitrix24.ru/open/18175702/)

{% endnote %}

### Для даты

- В `values` передайте дату в формате Atom, например `2026-03-18T00:00:00+03:00`
- В `fields` укажите тип поля: `TYPE` = `DATE`
- При необходимости задайте формат вывода по умолчанию через `FORMAT['format']`:

    - `d` — день месяца с ведущим нулем
    - `j` — день месяца без ведущего нуля
    - `m` — номер месяца с ведущим нулем
    - `n` — номер месяца без ведущего нуля
    - `F` — название месяца в родительном падеже, например `марта`
    - `f` — название месяца в именительном падеже, например `Март`
    - `y` — год двумя цифрами
    - `Y` — год четырьмя цифрами
    - `H` — часы в 24-часовом формате с ведущим нулем
    - `i` — минуты с ведущим нулем
    - `s` — секунды с ведущим нулем

Символы форматирования даты и времени можно комбинировать:

- `d.m.y` — `28.03.26`
- `j F Y` — `28 марта 2026`
- `H:i:s` — `10:24:18`
- `Y-m-d H:i:s` — `2026-03-28 10:24:18`

Название месяца выводится на языке региона, который задан в шаблоне.

### Для имени

- В `values` передайте имя массивом с частями ФИО:

    ```php
    [
        'NAME' => 'Игорь', // имя
        'LAST_NAME' => 'Иванов', // фамилия
        'SECOND_NAME' => 'Петрович', // отчество
        'GENDER' => 'M', // пол
    ]
    ```

По ключу `GENDER` можно передать пол явно: `M` или `F`. Если пол не указан, модуль попытается определить его по отчеству. Если `GENDER` и отчество не указаны, пол не будет определен и склонение не будет работать.

- В `fields` укажите тип поля: `TYPE` = `NAME`
- В `FORMAT['format']` можно передать шаблон вывода:

    - `#TITLE#` — обращение
    - `#NAME#` — имя
    - `#LAST_NAME#` — фамилия
    - `#SECOND_NAME#` — отчество
    - `#NAME_SHORT#` — первая буква имени с точкой
    - `#LAST_NAME_SHORT#` — первая буква фамилии с точкой
    - `#SECOND_NAME_SHORT#` — первая буква отчества с точкой

- В `FORMAT['case']` можно передать падеж по умолчанию:

    - `-1` — именительный
    - `0` — родительный
    - `1` — дательный
    - `2` — винительный
    - `3` — творительный
    - `4` — предложный

## Пример

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"templateId":203,"value":"ORDER_1024","values":{"SomeDate":"2026-03-18T00:00:00+03:00","SomeName":{"NAME":"Владислав","LAST_NAME":"Горелкин","GENDER":"M"}},"fields":{"SomeDate":{"TYPE":"DATE","FORMAT":{"format":"d.m.Y H:i"}},"SomeName":{"TYPE":"NAME","FORMAT":{"case":0,"format":"#NAME# #LAST_NAME#"}}}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.document.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentAddResult = {
      document: {
        id: number
        title: string
        downloadUrl: string
      }
    }

    const response = await $b24.actions.v2.call.make<DocumentAddResult>({
      method: 'documentgenerator.document.add',
      params: {
        templateId: 203,
        value: 'ORDER_1024',
        values: {
          // the date is passed in the atom format
          SomeDate: '2026-03-18T00:00:00+03:00',
          // the name is passed as an object with name parts
          SomeName: {
            NAME: 'Vladislav',
            LAST_NAME: 'Gorelkin',
            GENDER: 'M',
          },
        },
        fields: {
          SomeDate: {
            TYPE: 'DATE',
            FORMAT: {
              format: 'd.m.Y H:i',
            },
          },
          SomeName: {
            TYPE: 'NAME',
            FORMAT: {
              case: 0,
              format: '#NAME# #LAST_NAME#',
            },
          },
        },
      },
      requestId: Text.getUuidRfc4122()
    })

    if (!response.isSuccess) {
      console.error(response.getErrorMessages().join('; '))
    } else {
      console.info('Created document id:', response.getData()!.result.document.id)
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'documentgenerator.document.add',
            [
                'templateId' => 203,
                'value' => 'ORDER_1024',
                'values' => [
                    // значение передано в формате atom
                    'SomeDate' => '2026-03-18T00:00:00+03:00',
                    // имя передано в виде массива
                    'SomeName' => [
                        'NAME' => 'Владислав',
                        'LAST_NAME' => 'Горелкин',
                        'GENDER' => 'M',
                    ],
                ],
                'fields' => [
                    // тип поля — дата
                    'SomeDate' => [
                        'TYPE' => 'DATE',
                        'FORMAT' => [
                            'format' => 'd.m.Y H:i',
                        ],
                    ],
                    // тип поля — имя
                    'SomeName' => [
                        'TYPE' => 'NAME',
                        'FORMAT' => [
                            'case' => 0,
                            'format' => '#NAME# #LAST_NAME#',
                        ],
                    ],
                ],
            ]
        );

        $result = $response->getResponseData()->getResult();
        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

{% endlist %}

## Что вернется

Метод возвращает данные созданного документа. В поле `values` возвращаются исходные значения, которые вы передали, а отформатированные значения подставляются в файл документа. Пример ответа сокращен, полное описание полей — на странице метода [documentgenerator.document.add](../document-generator-document-add.md).

```json
{
    "result": {
        "document": {
            "id": 51,
            "title": "ORDER Template 51",
            "templateId": "203",
            "value": "ORDER_1024",
            "values": {
                "SomeDate": "2026-03-18T00:00:00+03:00",
                "_creationMethod": "rest"
            },
            "isTransformationError": false,
            "downloadUrl": "/bitrix/services/main/ajax.php?action=documentgenerator.api.document.getfile&SITE_ID=s1&id=51&ts=1773844068"
        }
    }
}
```

## Проверим результат

1. Скачайте файл по `downloadUrl` из ответа
2. Проверьте, что дата выведена в формате из `FORMAT['format']`, а имя — по шаблону вывода и в нужном падеже
3. Если формат не применился, сверьте коды полей в `values` и `fields`: они должны совпадать между собой и с плейсхолдерами шаблона

## Если метод вернул ошибку

- `Empty required parameter "value"` — не передан обязательный параметр `value`
- `Шаблон не найден` — шаблона с указанным `templateId` не существует

Дата выведена как есть — проверьте, что в `values` она передана в формате Atom, а в `fields` для этого поля указан `TYPE` = `DATE`.

Имя не склоняется — передайте `GENDER` явно или добавьте отчество в `SECOND_NAME`.

Полный список ошибок — в разделе «Обработка ошибок» на странице метода [documentgenerator.document.add](../document-generator-document-add.md).

## Продолжите изучение

- [{#T}](./document-text-data.md)
- [{#T}](./document-table-data.md)
- [{#T}](./document-table-complex.md)
- [{#T}](./document-images-seals.md)
- [{#T}](./index.md)
