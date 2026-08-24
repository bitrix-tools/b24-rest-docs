# Найти файлы и папки disk.file.search

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `disk.file.search` находит файлы и папки на Диске по текстовому запросу.

Поиск работает по индексу: в него попадают имена файлов и папок, а для документов — еще и текст внутри файла. Объекты в корзине метод не находит.

В результат попадают только объекты, которые доступны текущему пользователю на чтение. Объекты из хранилищ без внутренних прав доступа — например, из хранилищ других модулей — метод не возвращает. Папки чатов исключаются из выдачи.

Запрос короче трех символов метод отклоняет, поэтому для подсказки по первым введенным буквам он не подходит. Чтобы пройти по известной структуре, используйте методы [disk.storage.getChildren](../storage/disk-storage-get-children.md) и [disk.folder.getChildren](../folder/disk-folder-get-children.md), а если идентификатор файла уже известен — [disk.file.get](./disk-file-get.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **QUERY***
[`string`](../../data-types.md) | Текст поискового запроса.

Длина — от 3 до 255 символов. Повторяющиеся пробелы схлопываются в один, пробелы по краям обрезаются, длина проверяется уже после этого ||
|| **TYPE**
[`enum`](../../data-types.md) | Тип объектов в результате:

- `file` — только файлы
- `folder` — только папки
- `all` — файлы и папки

Значение по умолчанию — `file` ||
|| **FILTER**
[`object`](../../data-types.md) | Область поиска [(подробное описание)](#filter).

Без этого параметра метод ищет по всем доступным пользователю хранилищам ||
|| **start**
[`integer`](../../data-types.md) | Смещение для постраничной навигации.

За один запрос метод возвращает не более 50 объектов. Значение параметра — количество пропущенных объектов, а не номер страницы: при `start=10` выдача начнется с одиннадцатого объекта.

Значение по умолчанию — 0. Максимальное значение — 1000, большее метод приводит к 1000.

Имя параметра пишется строчными буквами, в отличие от остальных параметров метода ||
|#

### Параметр FILTER {#filter}

#|
|| **Название**
`тип` | **Описание** ||
|| **STORAGE_ID**
[`integer`](../../data-types.md) | Необязательный ключ. Идентификатор хранилища, внутри которого нужно искать.

Идентификатор можно получить методом [disk.storage.getList](../storage/disk-storage-get-list.md) ||
|| **FOLDER_ID**
[`integer`](../../data-types.md) | Необязательный ключ. Идентификатор папки, внутри которой нужно искать. Поиск идет и по вложенным папкам, сама папка в результат не попадает.

Идентификатор можно получить методом [disk.folder.getChildren](../folder/disk-folder-get-children.md) ||
|#

Оба ключа можно передать вместе — тогда метод проверит, что папка принадлежит указанному хранилищу, и вернет ошибку `NOT_FOUND`, если это не так.

Другие ключи в `FILTER` метод не принимает и возвращает ошибку `INVALID_FILTER`.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"QUERY":"тест","TYPE":"all","FILTER":{"STORAGE_ID":1}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.file.search
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"QUERY":"тест","TYPE":"all","FILTER":{"STORAGE_ID":1},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.file.search
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    // Fields marked optional come only for files or only for folders
    type DiskFileSearchItem = {
      ID: string
      NAME: string
      CODE: string | null
      STORAGE_ID: string
      TYPE: 'file' | 'folder'
      REAL_OBJECT_ID?: string
      PARENT_ID: string
      DELETED_TYPE: string
      GLOBAL_CONTENT_VERSION?: string
      FILE_ID?: string
      SIZE?: string
      CREATE_TIME: ISODate
      UPDATE_TIME: ISODate
      DELETE_TIME: ISODate | null
      CREATED_BY: string
      UPDATED_BY: string
      DELETED_BY: string
      DOWNLOAD_URL?: string
      DETAIL_URL: string | null
    }

    try {
      const response = await $b24.actions.v2.call.make<DiskFileSearchItem[]>({
        method: 'disk.file.search',
        params: {
          QUERY: 'тест',
          TYPE: 'all',
          FILTER: {
            STORAGE_ID: 1,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.forEach((item) => console.info(item.ID, item.TYPE, item.NAME))
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function searchDiskFiles() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'disk.file.search',
            params: {
              QUERY: 'тест',
              TYPE: 'all',
              FILTER: {
                STORAGE_ID: 1
              }
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.forEach(function (item) {
            console.info(item.ID, item.TYPE, item.NAME)
          })
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', searchDiskFiles)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'disk.file.search',
                [
                    'QUERY' => 'тест',
                    'TYPE' => 'all',
                    'FILTER' => [
                        'STORAGE_ID' => 1
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error searching files: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.file.search",
        {
            QUERY: "тест",
            TYPE: "all",
            FILTER: {
                STORAGE_ID: 1
            }
        },
        function (result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'disk.file.search',
        [
            'QUERY' => 'тест',
            'TYPE' => 'all',
            'FILTER' => [
                'STORAGE_ID' => 1
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "disk.file.search", b24.Params{
    	"QUERY": "тест",
    	"TYPE":  "all",
    	"FILTER": b24.Params{
    		"STORAGE_ID": 1,
    	},
    })
    if err != nil {
    	return fmt.Errorf("disk.file.search: %w", err)
    }

    var items []struct {
    	ID           b24.ID `json:"ID"`
    	Name         string `json:"NAME"`
    	StorageID    b24.ID `json:"STORAGE_ID"`
    	Type         string `json:"TYPE"`
    	RealObjectID b24.ID `json:"REAL_OBJECT_ID"`
    	ParentID     b24.ID `json:"PARENT_ID"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Name)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "1739",
            "NAME": "Новая папка для теста процесса",
            "CODE": null,
            "STORAGE_ID": "1",
            "TYPE": "folder",
            "REAL_OBJECT_ID": "1739",
            "PARENT_ID": "649",
            "DELETED_TYPE": "0",
            "CREATE_TIME": "2020-10-26T16:25:33+03:00",
            "UPDATE_TIME": "2024-11-26T09:23:03+03:00",
            "DELETE_TIME": null,
            "CREATED_BY": "0",
            "UPDATED_BY": "1",
            "DELETED_BY": "0",
            "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1/disk/path/Созданные файлы/Новая папка для теста процесса"
        },
        {
            "ID": "1277",
            "NAME": "Роман Савин - Тестирование Дот Ком.pdf",
            "CODE": null,
            "STORAGE_ID": "1",
            "TYPE": "file",
            "PARENT_ID": "1275",
            "DELETED_TYPE": "0",
            "GLOBAL_CONTENT_VERSION": "1",
            "FILE_ID": "1983",
            "SIZE": "5517483",
            "CREATE_TIME": "2020-08-07T15:43:48+03:00",
            "UPDATE_TIME": "2020-08-07T15:43:48+03:00",
            "DELETE_TIME": null,
            "CREATED_BY": "1",
            "UPDATED_BY": "1",
            "DELETED_BY": "0",
            "DOWNLOAD_URL": "https://test.bitrix24.ru/rest/download.json?auth=**put_access_token_here**&token=disk%7CaWQ9MTI3NyZfPXVqVGJUMmxoclBOb0JmQjVLWmxyWnRISWFTQ2M5V2hT",
            "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1/disk/file/Загруженные файлы/Файлы из Google Drive/Роман Савин - Тестирование Дот Ком.pdf"
        }
    ],
    "time": {
        "start": 1785494344,
        "finish": 1785494344.440217,
        "duration": 0.4402170181274414,
        "processing": 0,
        "date_start": "2026-07-31T13:39:04+03:00",
        "date_finish": "2026-07-31T13:39:04+03:00",
        "operating_reset_at": 1785494944,
        "operating": 0.13181495666503906
    }
}
```

Если ничего не найдено, метод возвращает пустой массив:

```json
{
    "result": [],
    "time": {
        "start": 1785496443,
        "finish": 1785496443.510742,
        "duration": 0.5107419490814209,
        "processing": 0,
        "date_start": "2026-07-31T14:14:03+03:00",
        "date_finish": "2026-07-31T14:14:03+03:00",
        "operating_reset_at": 1785497043,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив найденных объектов [(подробное описание)](#result) ||
|| **next**
[`integer`](../../data-types.md) | Смещение для следующего запроса. Приходит только тогда, когда есть следующая страница [(пример)](#pagination) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект в массиве result {#result}

Набор полей зависит от типа объекта. Поля `GLOBAL_CONTENT_VERSION`, `FILE_ID`, `SIZE` и `DOWNLOAD_URL` приходят только для файлов, поле `REAL_OBJECT_ID` — только для папок.

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор объекта ||
|| **NAME**
[`string`](../../data-types.md) | Имя файла или папки ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код объекта. Приходит `null`, если код не задан ||
|| **STORAGE_ID**
[`integer`](../../data-types.md) | Идентификатор хранилища, в котором находится объект ||
|| **TYPE**
[`enum`](../../data-types.md) | Тип объекта: `file` или `folder` ||
|| **REAL_OBJECT_ID**
[`integer`](../../data-types.md) | Идентификатор папки, на которую ссылается объект. Для обычной папки совпадает с `ID`. Приходит только для папок ||
|| **PARENT_ID**
[`integer`](../../data-types.md) | Идентификатор родительской папки ||
|| **DELETED_TYPE**
[`enum`](../../data-types.md) | Статус удаления объекта. Метод возвращает только объекты со значением `0` — не удален ||
|| **GLOBAL_CONTENT_VERSION**
[`integer`](../../data-types.md) | Инкрементальный счетчик версии файла. Приходит только для файлов ||
|| **FILE_ID**
[`integer`](../../data-types.md) | Внутреннее значение идентификатора файла. Приходит только для файлов ||
|| **SIZE**
[`integer`](../../data-types.md) | Размер файла в байтах. Приходит только для файлов ||
|| **CREATE_TIME**
[`datetime`](../../data-types.md) | Дата и время создания объекта ||
|| **UPDATE_TIME**
[`datetime`](../../data-types.md) | Дата и время последнего обновления объекта ||
|| **DELETE_TIME**
[`datetime`](../../data-types.md) | Дата и время переноса объекта в корзину. Метод не возвращает объекты из корзины, поэтому поле всегда `null` ||
|| **CREATED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего объект ||
|| **UPDATED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, внесшего последнее изменение ||
|| **DELETED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, удалившего объект ||
|| **DOWNLOAD_URL**
[`string`](../../data-types.md) | Ссылка для скачивания файла. Приходит только для файлов ||
|| **DETAIL_URL**
[`string`](../../data-types.md) | Ссылка для открытия объекта в интерфейсе. Для объектов из хранилищ, которые не относятся к Диску, приходит `null` ||
|#

Объекты отсортированы по дате последнего изменения, от новых к старым.

### Постраничная навигация {#pagination}

За один запрос метод возвращает не более 50 объектов. Если найдено больше, рядом с `result` приходит поле `next` — смещение, с которого начинается следующая страница. Общее количество найденных объектов метод не возвращает.

Ответ первой страницы, в примере `result` сокращен до 2 объектов из 50:

```json
{
    "result": [
        {
            "ID": "9739",
            "NAME": "отчет-51.txt",
            "CODE": null,
            "STORAGE_ID": "1",
            "TYPE": "file",
            "PARENT_ID": "9637",
            "DELETED_TYPE": "0",
            "GLOBAL_CONTENT_VERSION": "1",
            "FILE_ID": "36819",
            "SIZE": "6",
            "CREATE_TIME": "2026-07-31T14:15:49+03:00",
            "UPDATE_TIME": "2026-07-31T14:15:49+03:00",
            "DELETE_TIME": null,
            "CREATED_BY": "1",
            "UPDATED_BY": "1",
            "DELETED_BY": "0",
            "DOWNLOAD_URL": "https://test.bitrix24.ru/rest/download.json?auth=**put_access_token_here**&token=disk%7CaWQ9OTczOSZfPTFEU1hGMGtkY3E2Q3FZUTIyM2tiV3R6Tk5jZHgxMzR2",
            "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1/disk/file/Отчеты/отчет-51.txt"
        },
        {
            "ID": "9737",
            "NAME": "отчет-50.txt",
            "CODE": null,
            "STORAGE_ID": "1",
            "TYPE": "file",
            "PARENT_ID": "9637",
            "DELETED_TYPE": "0",
            "GLOBAL_CONTENT_VERSION": "1",
            "FILE_ID": "36817",
            "SIZE": "6",
            "CREATE_TIME": "2026-07-31T14:15:48+03:00",
            "UPDATE_TIME": "2026-07-31T14:15:48+03:00",
            "DELETE_TIME": null,
            "CREATED_BY": "1",
            "UPDATED_BY": "1",
            "DELETED_BY": "0",
            "DOWNLOAD_URL": "https://test.bitrix24.ru/rest/download.json?auth=**put_access_token_here**&token=disk%7CaWQ9OTczNyZfPTBmQlVlRDFCMTA0ajNhc3ZwbFdVRnhXNUg1MFpha3JO",
            "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1/disk/file/Отчеты/отчет-50.txt"
        }
    ],
    "next": 50,
    "time": {
        "start": 1785496566,
        "finish": 1785496566.197965,
        "duration": 0.19796490669250488,
        "processing": 0,
        "date_start": "2026-07-31T14:16:06+03:00",
        "date_finish": "2026-07-31T14:16:06+03:00",
        "operating_reset_at": 1785497166,
        "operating": 0
    }
}
```

Значение `next` передайте в параметре `start`:

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "Accept: application/json" \
-d '{"QUERY":"отчет","start":50}' \
https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.file.search
```

На последней странице поля `next` в ответе нет:

```json
{
    "result": [
        {
            "ID": "9639",
            "NAME": "отчет-01.txt",
            "CODE": null,
            "STORAGE_ID": "1",
            "TYPE": "file",
            "PARENT_ID": "9637",
            "DELETED_TYPE": "0",
            "GLOBAL_CONTENT_VERSION": "1",
            "FILE_ID": "36719",
            "SIZE": "6",
            "CREATE_TIME": "2026-07-31T14:14:56+03:00",
            "UPDATE_TIME": "2026-07-31T14:14:56+03:00",
            "DELETE_TIME": null,
            "CREATED_BY": "1",
            "UPDATED_BY": "1",
            "DELETED_BY": "0",
            "DOWNLOAD_URL": "https://test.bitrix24.ru/rest/download.json?auth=**put_access_token_here**&token=disk%7CaWQ9OTYzOSZfPXFPZWc1bnBGZFFPcXd0anlzd3BHN2VEQ3c4UXlGdk5l",
            "DETAIL_URL": "https://test.bitrix24.ru/company/personal/user/1/disk/file/Отчеты/отчет-01.txt"
        }
    ],
    "time": {
        "start": 1785496584,
        "finish": 1785496584.545265,
        "duration": 0.5452649593353271,
        "processing": 0,
        "date_start": "2026-07-31T14:16:24+03:00",
        "date_finish": "2026-07-31T14:16:24+03:00",
        "operating_reset_at": 1785497184,
        "operating": 0
    }
}
```

Глубина навигации ограничена: смещение больше 1000 метод приводит к 1000. Дальше объекта с номером 1050 выдача не сдвигается, поэтому увеличивать `start` бесконечно бессмысленно. Если результатов слишком много, сузьте область поиска параметром `FILTER`.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "INVALID_QUERY",
    "error_description": "Search query is invalid. (INVALID_QUERY)."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Invalid value of parameter { Parameter #0 [ `<required>` $QUERY ] }. | Не передан обязательный параметр `QUERY` ||
|| `INVALID_QUERY` | Search query is invalid. (INVALID_QUERY). | Запрос короче 3 или длиннее 255 символов либо передан не строкой ||
|| `INVALID_TYPE` | Search result type is invalid. (INVALID_TYPE). | Значение `TYPE` отличается от `file`, `folder` и `all` ||
|| `INVALID_FILTER` | Search filter contains an unknown field. (INVALID_FILTER). | В `FILTER` передан ключ, кроме `STORAGE_ID` и `FOLDER_ID` ||
|| `NOT_FOUND` | Search scope was not found. (NOT_FOUND). | Хранилище или папка из `FILTER` не существует, недоступна пользователю на чтение или папка не принадлежит указанному хранилищу. Та же ошибка приходит, если `FILTER` передан не объектом ||
|| `UNSUPPORTED_STORAGE` | Search is not supported for this storage. (UNSUPPORTED_STORAGE). | В указанном хранилище не используются внутренние права доступа Диска ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-file-copy-to.md)
- [{#T}](./disk-file-delete.md)
- [{#T}](./disk-file-get-external-link.md)
- [{#T}](./disk-file-get-fields.md)
- [{#T}](./disk-file-get-versions.md)
- [{#T}](./disk-file-get.md)
- [{#T}](./disk-file-mark-deleted.md)
- [{#T}](./disk-file-move-to.md)
- [{#T}](./disk-file-rename.md)
- [{#T}](./disk-file-restore-from-version.md)
- [{#T}](./disk-file-restore.md)
- [{#T}](./disk-file-upload-version.md)
