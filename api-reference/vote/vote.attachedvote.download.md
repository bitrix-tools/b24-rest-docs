# Скачать отчет по голосованию vote.AttachedVote.download

> Scope: [`vote`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами чтения голосования

Метод `vote.AttachedVote.download` формирует и отдает для скачивания отчет по голосованию в указанном формате.

{% note info "Особенности метода" %}

Внимание! Этот метод является исключением из общего правила работы с REST API. В отличие от других методов, он возвращает не `JSON`-объект, а непосредственно содержимое файла с HTTP-заголовками, инициирующими скачивание в браузере.

Из-за этого стандартная функция `BX24.callMethod()` **не может** обработать ответ и вызовет ошибку. Для работы с этим методом необходимо выполнять прямой HTTP-запрос, как показано в примере кода на JS.

{% endnote %}

## Параметры метода

Доступно три варианта вызова метода.

### 1. Через идентификатор прикрепленного опроса

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **attachId***
[`integer`](../data-types.md) | Идентификатор прикрепленного голосования, получить можно методами [vote.AttachedVote.get](./vote.attachedvote.get.md) или [vote.AttachedVote.getMany](./vote.attachedvote.getMany.md) ||
|#

### 2. Через элемент с опросом

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **moduleId***
[`string`](../data-types.md) | Идентификатор модуля, возможные значения:
- `Im` для опроса в чате,
- `blog` для опроса в ленте ||
|| **entityType***
[`string`](../data-types.md) | Тип объекта, возможные значения:
- `Bitrix\\Vote\\Attachment\\ImMessageConnector` для опроса в чате,
- `Bitrix\\Vote\\Attachment\\BlogPostConnector` для опроса в ленте ||
|| **entityId***
[`integer`](../data-types.md) | Идентификатор элемента, возможные значения:
- `id` сообщения чата с опросом, получить можно методом [vote.Integration.Im.send](./vote.integration.im.send.md),
- `id` поста с опросом в ленте, получить можно методом [log.blogpost.get](../log/log-blogpost-get.md) ||
|#

### 3. Через подписанный идентификатор

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **signedAttachId***
[`string`](../data-types.md) | Подписанный идентификатор прикрепления, получить можно методом [vote.AttachedVote.get](./vote.attachedvote.get.md), параметр ответа `signedAttachId` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -L \
    -o **put_file_name**.xls \
    -H "Content-Type: application/json" \
    -d '{"attachId":**put_attach_id**}' \
    "https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/vote.AttachedVote.download"


    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -L \
    -o **put_file_name**.xls \
    -H "Content-Type: application/json" \
    -d '{"attachId":**put_attach_id**, "auth": "**put_access_token_here**"}' \
    "https://**put_your_bitrix24_address**/rest/vote.AttachedVote.download"
    ```

- BX24.js

    ```js
    function downloadVoteReportById(attachId)
    {
        // 1. Получаем данные для авторизации из библиотеки BX24
        const auth = BX24.getAuth();
        if (!auth)
        {
            return;
        }
    
        // 2. Формируем URL для прямого запроса к REST API
        const restUrl = new URL(`https://${auth.domain}/rest/vote.AttachedVote.download`);
        restUrl.searchParams.append('auth', auth.access_token);
        restUrl.searchParams.append('attachId', attachId);
    
        console.log(`Запрос на скачивание: ${restUrl}`);
    
        // 3. Выполняем запрос и обрабатываем ответ как бинарный файл (blob)
        fetch(restUrl)
            .then(response => {
                if (!response.ok)
                {
                    // Если запрос не прошел, пытаемся обработать стандартную JSON-ошибку Bitrix24
                    return response.json().catch(() => {
                        // Если тело ответа - не JSON, выбрасываем общую сетевую ошибку
                        throw new Error(`Сетевая ошибка: ${response.status} ${response.statusText}`);
                    }).then(errorData => {
                        // Если удалось распарсить JSON-ошибку
                        throw new Error(`Ошибка API: ${errorData.error_description || 'Неизвестная ошибка'}`);
                    });
                }
                // В случае успеха получаем данные как бинарный объект
                return response.blob();
            })
            .then(blob => {
                // 4. Создаем "невидимую" ссылку и инициируем скачивание в браузере
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                
                // Задаем имя файла, которое увидит пользователь
                a.download = `vote_report_${attachId}.${fileType}`;
                
                document.body.appendChild(a);
                a.click();
                
                // Очищаем временные данные
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch(error => {
                console.error('Ошибка при скачивании отчета:', error);
                alert(`Не удалось скачать отчет: ${error.message}`);
            });
    }
    ```

- PHP CRest

    ```php
    <?php
    // Этот файл обычно содержит константы для подключения или настройки автозагрузчика
    require_once('src/crest.php');

    /**
    * Функция для скачивания отчета с помощью прямого HTTP-запроса,
    * так как метод vote.AttachedVote.download возвращает не JSON, а содержимое файла.
    *
    * @param array $params - Параметры REST-метода (например, ['attachId' => 1])
    */
    function downloadVoteReport(array $params, string $saveToFile): bool
    {
        // 1. Получаем настройки авторизации. 
        // CRest::getAppSettings() вернет либо данные для OAuth, либо для вебхука.
        // В самом crest.php меняем модификатор доступа на public для этого метода
        $authData = CRest::getAppSettings();

        if (empty($authData)) {
            echo "Ошибка: не удалось получить настройки авторизации. Проверьте crest.php/settings.php.\n";
            return false;
        }

        // 2. Определяем URL для запроса
        if (!empty($authData['is_web_hook']) && $authData['is_web_hook'] === 'Y') {
            // Случай с вебхуком
            $url = $authData['client_endpoint'] . 'vote.AttachedVote.download';
            $queryParams = $params;
        } else {
            // Случай с OAuth-приложением
            $url = $authData['client_endpoint'] . 'vote.AttachedVote.download';
            $params['auth'] = $authData['access_token'];
            $queryParams = $params;
        }

        $url .= '?' . http_build_query($queryParams);
        echo "URL запроса: " . $url . "\n";

        // 3. Выполняем запрос с помощью cURL
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => $url,
            CURLOPT_HEADER => false,        // Не включать заголовки в ответ
            CURLOPT_RETURNTRANSFER => true, // Вернуть ответ в виде строки, а не выводить в браузер
            CURLOPT_USERAGENT => 'CRest based downloader',
            CURLOPT_FOLLOWLOCATION => true, // Следовать за редиректами
        ]);

        $response = curl_exec($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        $error = curl_error($curl);
        curl_close($curl);

        // 4. Проверяем результат и сохраняем файл
        if ($error) {
            echo "Ошибка cURL: " . $error . "\n";
            return false;
        }

        if ($httpCode >= 400) {
            echo "Сервер вернул ошибку HTTP " . $httpCode . ".\n";
            // Попытка декодировать ошибку, если она в формате JSON
            $errorData = json_decode($response, true);
            if ($errorData && isset($errorData['error_description'])) {
                echo "Описание ошибки: " . $errorData['error_description'] . "\n";
            } else {
                echo "Тело ответа: " . $response . "\n";
            }
            return false;
        }
        
        // Если все хорошо, сохраняем ответ в файл
        if (file_put_contents($saveToFile, $response)) {
            echo "Файл успешно сохранен в: " . $saveToFile . "\n";
            return true;
        } else {
            echo "Не удалось сохранить файл в: " . $saveToFile . "\n";
            return false;
        }
    }


    // --- Пример использования ---

    $attachId = 1;
    $fileType = 'xls';
    $fileName = "vote_report_{$attachId}.{$fileType}";

    $result = downloadVoteReport(
        [
            'attachId' => $attachId,
        ],
        $fileName
    );

    if ($result) {
        echo "Задание выполнено.\n";
    } else {
        echo "Во время выполнения произошли ошибки.\n";
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200 OK**

В случае успешного выполнения, сервер возвращает не JSON-объект, а непосредственно содержимое файла с HTTP-заголовками, инициирующими скачивание в браузере `Content-Disposition: attachment`.

## Обработка ошибок

HTTP-статус: **4xx**

```json
{
    "error": "ATTACH_NOT_FOUND",
    "error_description": "Attach not found"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ATTACH_NOT_FOUND` | Голосование не найдено ||
|| `ATTACH_READ_ACCESS_DENIED` | Нет прав для участия в голосовании  ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./vote.attachedvote.get.md)
- [{#T}](./vote.attachedvote.getAnswerVoted.md)
- [{#T}](./vote.attachedvote.getMany.md)
- [{#T}](./vote.attachedvote.getWithVoted.md)
- [{#T}](./vote.attachedvote.recall.md)
- [{#T}](./vote.attachedvote.resume.md)
- [{#T}](./vote.attachedvote.stop.md)
- [{#T}](./vote.attachedvote.vote.md)
- [{#T}](./vote.integration.im.send.md)
