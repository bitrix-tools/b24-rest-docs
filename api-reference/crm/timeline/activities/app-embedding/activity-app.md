# Как создать дело из приложения

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правами, необходимыми для конкретного действия:
>
> - [crm.activity.add](../activity-base/crm-activity-add.md) и [crm.activity.update](../activity-base/crm-activity-update.md) — право на изменение связанного элемента CRM
> - [crm.activity.delete](../activity-base/crm-activity-delete.md) — право на удаление связанного элемента CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Установленное приложение может добавить дело в таймлайн карточки CRM.

Когда сотрудник откроет его, Битрикс24 покажет страницу приложения в боковой панели. Так можно работать с приложением прямо из карточки: смотреть связанные данные, выполнять нужные действия или обращаться к внешнему сервису.

## Как работает сценарий {#workflow}

В сценарии участвуют пользователь, Битрикс24 и приложение:

- пользователь — выбирает элемент CRM и работает с созданным делом в таймлайне
- Битрикс24 — сохраняет дело и передает странице приложения параметры его открытия
- приложение — создает, изменяет или удаляет дело через REST API

Сначала пользователь выбирает на странице приложения элемент CRM — в этом сценарии лид. Приложение создает для него дело методом [crm.activity.add](../activity-base/crm-activity-add.md). Дело появляется в таймлайне лида.

Когда пользователь нажимает на это дело, Битрикс24 открывает страницу приложения и передает идентификатор дела в `PLACEMENT_OPTIONS`. Так приложение понимает, с каким делом нужно работать, и может изменить или удалить его.

В сценарии будем использовать методы:

- [crm.activity.add](../activity-base/crm-activity-add.md) — создадим дело приложения
- [crm.activity.update](../activity-base/crm-activity-update.md) — изменим или завершим дело
- [crm.activity.delete](../activity-base/crm-activity-delete.md) — удалим дело

Дальше соберем страницу приложения по шагам: подготовим файл, определим режим открытия, добавим интерфейс и настроим работу с делом. Для вызова методов REST API и функций интерфейса используем JavaScript-библиотеку [BX24.js](../../../../../sdk/bx24-js-sdk/index.md).

## 1. Подготовьте приложение {#start}

Создайте [приложение](../../../../../settings/app-installation/index.md) со scope [`crm`](../../../../scopes/permissions.md) и подготовьте сервер с HTTPS-адресом, доступным из внешней сети. Адрес установки приложения для этого сценария не требуется.

Перед началом подготовьте:

- идентификатор существующего сотрудника, который станет ответственным за дело. Его нужно подставить в переменную `responsibleId` на четвертом шаге
- доступ к лидам, с которыми будете проверять сценарий. Пользователь приложения должен иметь права на изменение и удаление выбранного лида

Создайте на сервере файл `index.php`. В следующих шагах последовательно добавляйте в него блоки кода. После последнего шага получится готовая страница приложения.

## 2. Определите режим открытия {#placement-options}

Одна и та же страница приложения может открываться в двух ситуациях:

- пользователь запускает приложение в Битрикс24 — на странице он выбирает лид и создает для него дело
- пользователь нажимает на созданное дело в таймлайне лида — Битрикс24 открывает ту же страницу с действиями для завершения или удаления дела

Чтобы определить ситуацию, приложение проверяет параметры, которые передал Битрикс24. При открытии дела из таймлайна Битрикс24 передает в POST-запросе `PLACEMENT_OPTIONS`. Значение содержит JSON-строку с двумя параметрами:

- `action` — действие, с которым открыта страница. Для дела приложения значение равно `view_activity`
- `activity_id` — числовой идентификатор открытого дела. Передайте его в методы [crm.activity.update](../activity-base/crm-activity-update.md) или [crm.activity.delete](../activity-base/crm-activity-delete.md)

Добавьте в начало файла `index.php` код, который получает и проверяет эти параметры:

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

```php
<?php
header('Content-Type: text/html; charset=UTF-8');

$placementOptions = [];

if (!empty($_POST['PLACEMENT_OPTIONS']))
{
    $decodedOptions = json_decode($_POST['PLACEMENT_OPTIONS'], true);

    if (is_array($decodedOptions))
    {
        $placementOptions = $decodedOptions;
    }
}

$activityId = isset($placementOptions['activity_id'])
    ? (int)$placementOptions['activity_id']
    : 0;

$isActivityView = ($placementOptions['action'] ?? '') === 'view_activity'
    && $activityId > 0;
?>
```

Если страница открыта из дела, переменная `$isActivityView` получит значение `true`, а `$activityId` — числовой идентификатор дела.

## 3. Добавьте интерфейс страницы {#interface}

Сразу после PHP-блока добавьте HTML-разметку. Она покажет нужные кнопки в зависимости от значения `$isActivityView`:

```php
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Дело приложения</title>
</head>
<body hidden>
<script src="//api.bitrix24.tech/api/v1/"></script>

<?php if ($isActivityView): ?>
    <p>Идентификатор дела: <?= $activityId ?></p>
    <button type="button" onclick="updateActivity(<?= $activityId ?>)">
        Завершить дело
    </button>
    <button type="button" onclick="deleteActivity(<?= $activityId ?>)">
        Удалить дело
    </button>
<?php else: ?>
    <button type="button" onclick="selectCRMEntity()">Выбрать лид</button>
    <span id="selected-entity">Лид не выбран</span>
    <button type="button" onclick="addActivity()">Создать дело</button>
<?php endif; ?>

<p id="status" role="status"></p>
```

Ветка `$isActivityView` выводит действия с открытым делом, альтернативная ветка — выбор лида и создание дела. Элемент `#status` используется в обоих режимах для сообщений о результате.

## 4. Инициализируйте BX24.js {#initialize}

После HTML-разметки добавьте общие переменные и вспомогательные функции. Замените значение `responsibleId` на идентификатор сотрудника, ответственного за дело.

Библиотека [BX24.js](../../../../../sdk/bx24-js-sdk/index.md) уже подключена в предыдущем блоке. Дождитесь ее инициализации с помощью [BX24.init](../../../../../sdk/bx24-js-sdk/system-functions/bx24-init.md), прежде чем вызывать методы Битрикс24.

```html
<script>
    const responsibleId = 1;
    let selectedEntityId = null;

    BX24.init(() => {
        document.body.hidden = false;
    });

    function showStatus(message, isError = false)
    {
        const status = document.getElementById('status');
        status.textContent = message;
        status.style.color = isError ? 'red' : 'green';
    }

    function showError(result)
    {
        showStatus(
            `Ошибка: ${result.error()} — ${result.error_description()}`,
            true
        );
    }
</script>
```

После выполнения `BX24.init` страница станет видимой. Функции `showStatus` и `showError` будут выводить результат вызовов REST API.

## 5. Добавьте создание дела {#create}

Чтобы создать дело приложения, вызовите метод [crm.activity.add](../activity-base/crm-activity-add.md) с полем `PROVIDER_ID=REST_APP`. Дело с `PROVIDER_ID=REST_APP` можно создать только из установленного приложения. Изменить или удалить его может только приложение, которое его создало. При вызове через вебхук Битрикс24 вернет ошибку `Application context required.`, а при вызове из другого приложения — `Access denied.`

Метод [crm.activity.add](../activity-base/crm-activity-add.md) помечен как устаревший, но в этом сценарии заменить его на [crm.activity.todo.add](../todo/crm-activity-todo-add.md) нельзя: метод не принимает поле `PROVIDER_ID`.

В примере пользователь выбирает лид через [BX24.selectCRM](../../../../../sdk/bx24-js-sdk/system-dialogues/bx24-select-crm.md). Для лида функция возвращает идентификатор с префиксом, например `L_123`. Приложение удаляет префикс `L_` и передает числовую часть в `OWNER_ID` метода [crm.activity.add](../activity-base/crm-activity-add.md).

Для другого объекта CRM измените `entityType`, префикс идентификатора и `OWNER_TYPE_ID`.

Основные поля для создания дела:

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

- `OWNER_TYPE_ID*` — числовой идентификатор [типа объекта CRM](../../../data-types.md#object_type). Для лида передайте `1`
- `OWNER_ID*` — числовой идентификатор выбранного лида
- `PROVIDER_ID*` — идентификатор провайдера. Для дела приложения передайте `REST_APP`
- `PROVIDER_TYPE_ID` — тип дела приложения. Если поле не передано, Битрикс24 использует значение `LINK`
- `SUBJECT*` — название дела в таймлайне
- `RESPONSIBLE_ID` — идентификатор сотрудника, ответственного за дело. В этом сценарии передайте его явно

Поле `TYPE_ID` обычно обязательно для [crm.activity.add](../activity-base/crm-activity-add.md). Для `REST_APP` его можно не передавать: метод автоматически устанавливает тип дела «Провайдер».

Добавьте после предыдущего блока функции для выбора лида и создания дела:

```html
<script>
    function selectCRMEntity()
    {
        BX24.selectCRM(
            { entityType: ['lead'] },
            (selected) => {
                const lead = selected.lead && selected.lead[0];

                if (!lead)
                {
                    return;
                }

                const id = Number(lead.id.replace(/^L_/, ''));

                if (!Number.isInteger(id) || id <= 0)
                {
                    showStatus('Не удалось определить идентификатор лида', true);
                    return;
                }

                selectedEntityId = id;
                document.getElementById('selected-entity').textContent = lead.title;
                showStatus(`Выбран лид с идентификатором ${id}`);
            }
        );
    }

    function addActivity()
    {
        if (!selectedEntityId)
        {
            showStatus('Сначала выберите лид', true);
            return;
        }

        BX24.callMethod(
            'crm.activity.add',
            {
                fields: {
                    OWNER_TYPE_ID: 1,
                    OWNER_ID: selectedEntityId,
                    PROVIDER_ID: 'REST_APP',
                    PROVIDER_TYPE_ID: 'LINK',
                    SUBJECT: 'Новое дело приложения',
                    COMPLETED: 'N',
                    RESPONSIBLE_ID: responsibleId,
                    DESCRIPTION: 'Описание нового дела'
                }
            },
            (result) => {
                if (result.error())
                {
                    showError(result);
                    return;
                }

                showStatus(`Дело создано. Идентификатор: ${result.data()}`);
            }
        );
    }
</script>
```

После успешного вызова [crm.activity.add](../activity-base/crm-activity-add.md) страница покажет числовой идентификатор созданного дела.

Пример успешного ответа с HTTP-статусом `200`:

```json
{
    "result": 123,
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

Поле `result` содержит идентификатор дела. В примере это `123`. Поле `time` содержит сведения о времени выполнения запроса. Когда пользователь откроет это дело в таймлайне, Битрикс24 передаст тот же идентификатор странице приложения в `PLACEMENT_OPTIONS.activity_id`.

## 6. Добавьте изменение и удаление дела {#manage}

Чтобы завершить дело, передайте его идентификатор в метод [crm.activity.update](../activity-base/crm-activity-update.md) и установите поле `COMPLETED=Y`.

Чтобы удалить дело, передайте тот же идентификатор в метод [crm.activity.delete](../activity-base/crm-activity-delete.md).

{% note warning "" %}

В исходном коде `crm.activity.delete` есть дефект: при проверке принадлежности дела `REST_APP` строковый идентификатор приложения строго сравнивается с числовым без приведения типов. Поэтому при штатном чтении дела из базы метод возвращает `Access denied.` даже для приложения, которое создало дело. До исправления метода удаление такого дела через этот сценарий не работает, изменение дела доступно.

{% endnote %}

Добавьте после функций создания дела следующий блок. Он также закрывает элементы `body` и `html`, поэтому разместите его в конце файла:

```html
<script>
    function updateActivity(id)
    {
        BX24.callMethod(
            'crm.activity.update',
            {
                id,
                fields: {
                    COMPLETED: 'Y',
                    SUBJECT: 'Дело выполнено',
                    DESCRIPTION: 'Описание выполненного дела'
                }
            },
            (result) => {
                if (result.error())
                {
                    showError(result);
                    return;
                }

                showStatus('Дело изменено');
            }
        );
    }

    function deleteActivity(id)
    {
        if (!window.confirm('Удалить дело?'))
        {
            return;
        }

        BX24.callMethod(
            'crm.activity.delete',
            { id },
            (result) => {
                if (result.error())
                {
                    showError(result);
                    return;
                }

                showStatus('Дело удалено');
            }
        );
    }
</script>
</body>
</html>
```

После успешного изменения или удаления методы [crm.activity.update](../activity-base/crm-activity-update.md) и [crm.activity.delete](../activity-base/crm-activity-delete.md) вернут ответ с HTTP-статусом `200` и одинаковой структурой:

```json
{
    "result": true,
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

Значение `result=true` подтверждает успешное изменение или удаление. Поле `time` содержит сведения о времени выполнения запроса. Страница выведет сообщение о выполненном действии.

## 7. Разместите и проверьте приложение {#check}

Сохраните `index.php` и разместите его на сервере, доступном из внешней сети. Полученный HTTPS-адрес укажите как адрес основной страницы приложения.

Проверьте сценарий:

1. Откройте приложение, выберите лид и создайте дело
2. Проверьте, что приложение показало числовой идентификатор нового дела
3. Откройте карточку выбранного лида и найдите дело в таймлайне
4. Нажмите на дело и проверьте, что Битрикс24 открыл приложение с тем же идентификатором
5. Завершите дело и проверьте его статус в таймлайне

## Ошибки и диагностика {#errors}

Функция `showError` выводит код и описание ошибки, которые вернул метод. Исправляйте причину по сообщению:

- `Application context required.` — вызов выполнен вне контекста приложения, например через входящий вебхук. Откройте страницу установленного приложения и повторите действие с пятого или шестого шага
- `Access denied.` — недостаточно прав для выполнения действия: для создания и изменения нужно право на изменение связанного элемента CRM, для удаления — право на удаление этого элемента. Ошибка также возникает, если дело создано другим приложением. Проверьте права и принадлежность дела, затем повторите действие
- `Activity is not found.` — дело с идентификатором из `activity_id` не найдено или уже удалено. Откройте актуальное дело из таймлайна и повторите шестой шаг
- `Could not build binding. Please ensure that owner info and communications are defined correctly.` — владелец дела не задан. Проверьте, что `OWNER_TYPE_ID=1`, а `OWNER_ID` содержит положительный числовой идентификатор без префикса `L_`, затем повторите пятый шаг
- `Could not find 'LEAD' with ID: N` — лид с идентификатором `N` не найден. Выберите существующий лид и повторите пятый шаг

Если страница остается скрытой и кнопки недоступны, проверьте HTTPS-адрес приложения, загрузку BX24.js и выполнение `BX24.init`. После исправления обновите страницу приложения. До получения идентификатора в ответе `crm.activity.add` не считайте дело созданным и не повторяйте вызов вслепую: сначала проверьте таймлайн выбранного лида.
