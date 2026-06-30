# Как встроить виджет во вкладку карточки CRM

> Scope: [`placement`, `crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы:
>
> - `placement.bind` — администратор
> - `crm.item.get` — любой пользователь с правом чтения сделки

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Вкладка в карточке CRM позволяет показать интерфейс приложения рядом с основными данными элемента. В этом сценарии добавим вкладку в карточку сделки, получим идентификатор открытой сделки и запросим ее данные.

Для сценария последовательно выполним методы:

1. [placement.bind](../../../api-reference/widgets/placement-bind.md) — зарегистрируем обработчик для вкладки `CRM_DEAL_DETAIL_TAB`
2. [crm.item.get](../../../api-reference/crm/universal/crm-item-get.md) — получим данные сделки по идентификатору из `PLACEMENT_OPTIONS`

{% note info "" %}

Исходный пример и дополнительные материалы доступны в уроке [Встройка в карточку CRM](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=266&LESSON_ID=25544).

{% endnote %}

## Как работает сценарий

Приложение регистрирует URL обработчика методом `placement.bind` и указывает код `CRM_DEAL_DETAIL_TAB`. После завершения установки приложения в карточке сделки появляется новая вкладка.

Когда пользователь открывает вкладку, Битрикс24 загружает обработчик в iframe и передает ему контекст вызова. В `PLACEMENT_OPTIONS.ID` приходит идентификатор текущей сделки. Обработчик передает этот идентификатор в `crm.item.get` и показывает полученные данные.

## 1. Подготовьте приложение

Создайте [приложение](../../../settings/app-installation/index.md) с интерфейсом и добавьте ему права:

- `placement` — для регистрации обработчика виджета
- `crm` — для получения данных сделки

Код регистрации и обработчик вкладки можно разместить в отдельных файлах или объединить в одном файле с разными ветками выполнения.

Разместите страницу обработчика по публичному HTTPS-адресу. В примерах используется адрес:

```text
https://your-domain.example/deal-tab.php
```

Сервер должен разрешать открытие страницы в iframe. Проверьте заголовок `X-Frame-Options` и директиву `frame-ancestors` заголовка `Content-Security-Policy`: они не должны запрещать встраивание страницы в Битрикс24.

{% note warning "" %}

URL обработчика должен быть доступен из внешней сети. Не используйте `localhost`, адреса локальной сети и самоподписанные SSL-сертификаты.

{% endnote %}

Метод `placement.bind` работает только в контексте приложения. Входящий вебхук для регистрации вкладки не подходит.

## 2. Зарегистрируйте вкладку

Выберите один вариант примера: BX24.js или PHP CRest.

Зарегистрируем обработчик методом `placement.bind`. Передадим параметры:

- `PLACEMENT` — код места встраивания `CRM_DEAL_DETAIL_TAB`
- `HANDLER` — публичный URL страницы, которая откроется во вкладке
- `TITLE` — название вкладки
- `LANG_ALL` — локализованные названия вкладки

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- BX24.js

    ```js
    BX24.callMethod(
        'placement.bind',
        {
            PLACEMENT: 'CRM_DEAL_DETAIL_TAB',
            HANDLER: 'https://your-domain.example/deal-tab.php',
            TITLE: 'Deal data',
            LANG_ALL: {
                ru: {
                    TITLE: 'Данные сделки',
                },
                en: {
                    TITLE: 'Deal data',
                },
            },
        },
        (result) => {
            if (result.error())
            {
                console.error(result.error() + ': ' + result.error_description());
                return;
            }

            console.info('Вкладка зарегистрирована');
        }
    );
    ```

- PHP CRest

    ```php
    <?php
    require_once('crest.php');

    $result = CRest::call(
        'placement.bind',
        [
            'PLACEMENT' => 'CRM_DEAL_DETAIL_TAB',
            'HANDLER' => 'https://your-domain.example/deal-tab.php',
            'TITLE' => 'Deal data',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Данные сделки',
                ],
                'en' => [
                    'TITLE' => 'Deal data',
                ],
            ],
        ]
    );

    if (!empty($result['error']))
    {
        echo $result['error'] . ': ' . $result['error_description'];
    }
    else
    {
        echo 'Вкладка зарегистрирована';
    }
    ```

{% endlist %}

Если обработчик успешно зарегистрирован, метод вернет `true`.

```json
{
    "result": true
}
```

После регистрации [завершите установку приложения](../../../settings/app-installation/installation-finish.md). Пока установка не завершена, вкладка недоступна обычным пользователям.

## 3. Обработайте открытие вкладки

При открытии вкладки Битрикс24 передает обработчику данные POST-запросом. Для карточки сделки основные параметры выглядят так:

```text
PLACEMENT=CRM_DEAL_DETAIL_TAB
PLACEMENT_OPTIONS={"ID":"3473"}
```

`PLACEMENT_OPTIONS` передается как JSON-строка. В PHP преобразуйте ее в массив функцией `json_decode`. В JavaScript SDK метод `BX24.getPlacementOptions()` возвращает готовый объект.

#|
|| **Параметр**
`тип` | **Описание** ||
|| **PLACEMENT**
[`string`](../../../api-reference/data-types.md) | Код места встраивания. Для вкладки сделки приходит `CRM_DEAL_DETAIL_TAB` ||
|| **PLACEMENT_OPTIONS**
[`string`](../../../api-reference/data-types.md) | JSON-строка с контекстом открытой карточки ||
|| **ID**
[`string`](../../../api-reference/data-types.md) | Идентификатор сделки внутри `PLACEMENT_OPTIONS` ||
|| **DOMAIN**
[`string`](../../../api-reference/data-types.md) | Адрес Битрикс24, в котором пользователь открыл вкладку ||
|| **PROTOCOL**
[`string`](../../../api-reference/data-types.md) | Протокол для обращения к Битрикс24: `0` — HTTP, `1` — HTTPS ||
|| **AUTH_ID**
[`string`](../../../api-reference/data-types.md) | OAuth-токен пользователя, который открыл вкладку. PHP-обработчик использует токен для вызова `crm.item.get` с правами этого пользователя ||
|#

Полный набор служебных параметров запроса описан на странице [вкладки в карточке CRM](../../../api-reference/widgets/crm/detail-tab.md#что-получает-обработчик).

## 4. Получите данные сделки

Вызовем `crm.item.get` из обработчика. Для сделки передадим:

- `entityTypeId: 2` — идентификатор типа объекта CRM «Сделка»
- `id` — идентификатор из `PLACEMENT_OPTIONS.ID`

Выберите один вариант обработчика:

- JavaScript вызывает метод через BX24.js с авторизацией пользователя, который открыл вкладку
- PHP выполняет OAuth-запрос с токеном `AUTH_ID`, который Битрикс24 передает для пользователя, открывшего вкладку

{% list tabs %}

- JS

    ```html
    <!DOCTYPE html>
    <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title>Данные сделки</title>
            <script src="https://api.bitrix24.com/api/v1/"></script>
        </head>
        <body>
            <h2 id="deal-title">Загрузка данных сделки</h2>
            <div id="deal-stage"></div>

            <script>
                BX24.init(() => {
                    const placementOptions = BX24.getPlacementOptions();
                    const dealId = Number(placementOptions.ID);

                    if (
                        BX24.getPlacement() !== 'CRM_DEAL_DETAIL_TAB'
                        || !Number.isInteger(dealId)
                        || dealId <= 0
                    )
                    {
                        document.getElementById('deal-title').textContent =
                            'Не удалось определить сделку';
                        return;
                    }

                    BX24.callMethod(
                        'crm.item.get',
                        {
                            entityTypeId: 2,
                            id: dealId,
                        },
                        (result) => {
                            if (result.error())
                            {
                                document.getElementById('deal-title').textContent =
                                    result.error_description();
                                return;
                            }

                            const deal = result.data().item;

                            document.getElementById('deal-title').textContent =
                                deal.title || 'Сделка без названия';
                            document.getElementById('deal-stage').textContent =
                                'Стадия: ' + deal.stageId;
                        }
                    );
                });
            </script>
        </body>
    </html>
    ```

- PHP (OAuth)

    ```php
    <?php
    $placement = $_POST['PLACEMENT'] ?? '';
    $placementOptions = isset($_POST['PLACEMENT_OPTIONS'])
        ? json_decode($_POST['PLACEMENT_OPTIONS'], true)
        : [];
    $placementOptions = is_array($placementOptions) ? $placementOptions : [];
    $dealId = (int)($placementOptions['ID'] ?? 0);
    $domain = (string)($_POST['DOMAIN'] ?? '');
    $authId = (string)($_POST['AUTH_ID'] ?? '');
    $protocol = ($_POST['PROTOCOL'] ?? '1') === '0' ? 'http' : 'https';
    $deal = [];
    $error = '';

    if (
        $placement !== 'CRM_DEAL_DETAIL_TAB'
        || $dealId <= 0
        || $domain === ''
        || $authId === ''
        || !preg_match('/^[a-z0-9.-]+(?::\d+)?$/i', $domain)
    )
    {
        $error = 'Не удалось получить контекст вызова';
    }
    else
    {
        $curl = curl_init($protocol . '://' . $domain . '/rest/crm.item.get.json');

        curl_setopt_array(
            $curl,
            [
                CURLOPT_POST => true,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT => 30,
                CURLOPT_POSTFIELDS => http_build_query([
                    'entityTypeId' => 2,
                    'id' => $dealId,
                    'auth' => $authId,
                ]),
            ]
        );

        $response = curl_exec($curl);

        if ($response === false)
        {
            $error = curl_error($curl);
        }

        curl_close($curl);

        if ($error === '')
        {
            $result = json_decode($response, true);

            if (!is_array($result))
            {
                $error = 'Не удалось разобрать ответ Битрикс24';
            }
            elseif (!empty($result['error']))
            {
                $error = $result['error_description'] ?? $result['error'];
            }
            else
            {
                $deal = $result['result']['item'] ?? [];
            }
        }
    }
    ?>
    <!DOCTYPE html>
    <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <title>Данные сделки</title>
        </head>
        <body>
            <?php if ($error !== ''): ?>
                <p><?=htmlspecialchars($error)?></p>
            <?php else: ?>
                <h2><?=htmlspecialchars($deal['title'] ?? 'Сделка без названия')?></h2>
                <p>Стадия: <?=htmlspecialchars($deal['stageId'] ?? '')?></p>
            <?php endif; ?>
        </body>
    </html>
    ```

{% endlist %}

Метод вернет объект `item` с данными сделки, доступными пользователю, чья авторизация используется в запросе.

```json
{
    "result": {
        "item": {
            "id": 3473,
            "title": "Подготовка предложения",
            "stageId": "NEW"
        }
    }
}
```

Идентификатор из `PLACEMENT_OPTIONS` можно использовать и для других действий: получить связанные контакты и компанию, запросить данные во внешней системе или показать собственный интерфейс работы со сделкой.

## 5. Проверьте виджет

1. Установите приложение в тестовый Битрикс24
2. Убедитесь, что установка приложения завершена
3. Откройте раздел CRM
4. Откройте любую сделку
5. Найдите вкладку **Данные сделки**
6. Проверьте, что обработчик показывает название и стадию открытой сделки

Если вкладка не появилась, проверьте регистрацию обработчика методом [placement.get](../../../api-reference/widgets/placement-get.md). В ответе должны быть код `CRM_DEAL_DETAIL_TAB` и URL страницы обработчика.

## Другие карточки CRM

По тому же сценарию можно добавить вкладку в карточки других объектов. Замените код в `PLACEMENT` и укажите соответствующий `entityTypeId` в `crm.item.get`.

#|
|| **Объект CRM** | **PLACEMENT** | **entityTypeId** ||
|| Лид | `CRM_LEAD_DETAIL_TAB` | `1` ||
|| Сделка | `CRM_DEAL_DETAIL_TAB` | `2` ||
|| Контакт | `CRM_CONTACT_DETAIL_TAB` | `3` ||
|| Компания | `CRM_COMPANY_DETAIL_TAB` | `4` ||
|| Счет | `CRM_SMART_INVOICE_DETAIL_TAB` | `31` ||
|#

Коды для коммерческих предложений и смарт-процессов смотрите в описании точки [CRM_XXX_DETAIL_TAB](../../../api-reference/widgets/crm/detail-tab.md).

## Продолжите изучение

- [Как встраивать виджеты в CRM](./index.md)
- [Вкладка в карточке CRM CRM_XXX_DETAIL_TAB](../../../api-reference/widgets/crm/detail-tab.md)
- [Установить обработчик виджета placement.bind](../../../api-reference/widgets/placement-bind.md)
- [Получить элемент CRM crm.item.get](../../../api-reference/crm/universal/crm-item-get.md)
- [Методы взаимодействия виджетов с интерфейсом](../../../api-reference/widgets/ui-interaction/index.md)
