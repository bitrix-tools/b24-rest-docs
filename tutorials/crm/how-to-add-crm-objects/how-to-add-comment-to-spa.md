# Как добавить комментарий в таймлайн смарт-процесса

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — «административный доступ к разделу CRM»
>
> - [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) — пользователь с административным доступом к разделу CRM
> - [crm.timeline.comment.add](../../../api-reference/crm/timeline/comments/crm-timeline-comment-add.md) — любой пользователь
> - [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) — любой пользователь с правом на чтение элементов объекта CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Ключевой параметр для добавления комментария в элемент CRM — [идентификатор типа объекта](../../../api-reference/crm/data-types.md#object_type). Идентификатор показывает, в какой тип объекта комментарий будет добавлен: в сделку, в лид, в определенный смарт-процесс.

Идентификатор используется в параметрах `OWNER_TYPE`, `OWNER_TYPE_ID` и `ENTITY_TYPE`, `ENTITY_TYPE_ID` групп методов [crm.item.*](../../../api-reference/crm/universal/index.md), [crm.timeline.*](../../../api-reference/crm/timeline/index.md), [crm.activity.*](../../../api-reference/crm/timeline/activities/index.md).

В CRM есть два типа идентификаторов объектов:

- **Предустановленные** — это идентификаторы [лидов](../../../api-reference/crm/leads/index.md), [сделок](../../../api-reference/crm/deals/index.md), [компаний](../../../api-reference/crm/companies/index.md), [контактов](../../../api-reference/crm/contacts/index.md), [счетов](../../../api-reference/crm/universal/invoice.md), [предложений](../../../api-reference/crm/quote/index.md). Идентификаторы предустановленных объектов есть в [документации](../../../api-reference/crm/data-types.md#object_type)

- **Динамические** — это идентификаторы смарт-процессов. Идентификатор смарт-процесса генерируется в момент создания, он не зависит от названия смарт-процесса

Получить идентификатор смарт-процесса можно двумя методами:

- [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md) — метод без параметров, возвращает перечисление типов объектов CRM, как предустановленных, так и динамических

- [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) — метод с фильтром, возвращает только динамические объекты CRM

В результате сценария в таймлайне элемента смарт-процесса появится комментарий, а метод вернет идентификатор записи таймлайна.

Сценарий состоит из двух шагов.

1. Получить `entityTypeId` смарт-процесса методом [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md)
2. Создать комментарий методом [crm.timeline.comment.add](../../../api-reference/crm/timeline/comments/crm-timeline-comment-add.md), собрав из `entityTypeId` значение параметра `ENTITY_TYPE`

## Что нужно до начала

- смарт-процесс уже создан в Битрикс24, и вы знаете его название. Смарт-процессы доступны не на всех тарифах: если создать их нельзя, метод [crm.type.add](../../../api-reference/crm/universal/user-defined-object-types/crm-type-add.md) вернет ошибку `CREATE_DYNAMIC_TYPE_RESTRICTED`

- в смарт-процессе есть элемент, в таймлайн которого нужно добавить комментарий. Идентификатор элемента возвращает метод [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) с параметром `entityTypeId` из шага 1

- вебхук создан от имени пользователя с административным доступом к разделу CRM — это требование метода [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md)

## 1. Получаем идентификатор типа смарт-процесса

Для получения идентификатора типа используем метод [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) с фильтром:

- `title` — укажем название смарт-процесса. Замените `Закупка оборудования` на название своего смарт-процесса

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    const response = await $b24.actions.v2.call.make({
        method: 'crm.type.list',
        params: {
            filter: {
                "title": "Закупка оборудования"
            }
        },
        requestId: 'type-list'
    });
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client


    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    response = client.crm.type.list(
        filter={
            "title": "Закупка оборудования",
        }
    ).response
    ```

- PHP

    ```php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    $result = $sb->getCRMScope()->type()->list(
        order: [],
        filter: ['title' => 'Закупка оборудования']
    );
    ```

- Go

    ```go
    // core, ctx и spaTitle объявлены в полном примере ниже
    res, err := core.Call(ctx, "crm.type.list", b24.Params{
    	"filter": b24.Params{"title": spaTitle},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.type.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом types. Двум смарт-процессам
    // никто не запрещает называться одинаково, поэтому ответ — список даже при
    // точном фильтре.
    var types struct {
    	Types []struct {
    		ID           int    `json:"id"`
    		EntityTypeID int    `json:"entityTypeId"`
    		Title        string `json:"title"`
    	} `json:"types"`
    }
    if err := json.Unmarshal(res.Result, &types); err != nil {
    	return fmt.Errorf("разбор смарт-процессов: %w", err)
    }
    if len(types.Types) == 0 {
    	return fmt.Errorf("смарт-процесс %q не найден", spaTitle)
    }

    // id — порядковый номер смарт-процесса, entityTypeId — идентификатор его
    // ТИПА. Дальше нужен именно entityTypeId, это разные числа.
    entityTypeID := types.Types[0].EntityTypeID
    ```

{% endlist %}

В результате получили два значения ID:

- `id`: `7` — порядковый номер смарт-процесса в Битрикс24

- `entityTypeId`: `177` — идентификатор типа смарт-процесса. Параметр, необходимый для следующего запроса

```json
{
    "result": {
        "types": [
            {
                "id": 7,
                "title": "Закупка оборудования",
                "code": "",
                "createdBy": 1,
                "entityTypeId": 177,
                "customSectionId": null,
                "isCategoriesEnabled": "Y",
                "isStagesEnabled": "Y",
                "isBeginCloseDatesEnabled": "Y",
                "isClientEnabled": "Y",
                "isUseInUserfieldEnabled": "Y",
                "isLinkWithProductsEnabled": "Y",
                "isMycompanyEnabled": "Y",
                "isDocumentsEnabled": "Y",
                "isSourceEnabled": "Y",
                "isObserversEnabled": "Y",
                "isRecyclebinEnabled": "Y",
                "isAutomationEnabled": "Y",
                "isBizProcEnabled": "Y",
                "isSetOpenPermissions": "Y",
                "isPaymentsEnabled": "N",
                "isCountersEnabled": "N",
                "createdTime": "2021-11-26T10:52:17+03:00",
                "updatedTime": "2024-11-12T15:32:39+03:00",
                "updatedBy": 1
            }
        ]
    }
}
```

Сохраните `entityTypeId` — на следующем шаге из него собирается значение `ENTITY_TYPE`. Значение `id` для этого сценария не нужно.

## 2. Добавляем комментарий к элементу смарт-процесса

Для добавления комментария используем метод [crm.timeline.comment.add](../../../api-reference/crm/timeline/comments/crm-timeline-comment-add.md) с параметрами:

- `ENTITY_ID` — ID элемента. Для получения значения ID используйте метод [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md), где `entityTypeId` фильтра равно значению `entityTypeId` из [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md). В примере укажем `19`

- `ENTITY_TYPE` — укажем `DYNAMIC_177`. Значение состоит из префикса динамического объекта `DYNAMIC_` и `entityTypeId` из результата предыдущего метода. Подставляйте именно `entityTypeId`: `id` смарт-процесса здесь не подойдет

- `COMMENT` — текстовое значение комментария. Пустую строку метод не принимает

{% list tabs %}

- JS

    ```javascript
    const response = await $b24.actions.v2.call.make({
        method: 'crm.timeline.comment.add',
        params: {
            fields:
            {
                "ENTITY_ID": 19,
                "ENTITY_TYPE": "DYNAMIC_177",
                "COMMENT": "Подтвердить закупку по почте!",
            }
        },
        requestId: 'comment-add'
    });
    ```

- Python

    ```python
    response = client.crm.timeline.comment.add(
        fields={
            "ENTITY_ID": 19,
            "ENTITY_TYPE": "DYNAMIC_177",
            "COMMENT": "Подтвердить закупку по почте!",
        }
    ).response
    ```

- PHP

    ```php
    $result = $sb->getCRMScope()->timelineComment()->add(
        [
            'ENTITY_ID' => 19,
            'ENTITY_TYPE' => 'DYNAMIC_177',
            'COMMENT' => 'Подтвердить закупку по почте!',
        ]
    );
    ```

- Go

    ```go
    // core, ctx, entityTypeID и itemID объявлены в полном примере ниже.
    // ENTITY_TYPE для смарт-процесса — это строка "DYNAMIC_" + entityTypeId.
    // Поля таймлайна пишутся В ВЕРХНЕМ РЕГИСТРЕ, тогда как crm.item.* принимает
    // camelCase: одна сущность, два соглашения в одном сценарии.
    res, err = core.Call(ctx, "crm.timeline.comment.add", b24.Params{
    	"fields": b24.Params{
    		"ENTITY_ID":   itemID,
    		"ENTITY_TYPE": "DYNAMIC_" + strconv.Itoa(entityTypeID),
    		"COMMENT":     "Подтвердить закупку по почте!",
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.timeline.comment.add: %w", err)
    }

    // Обёртки здесь нет вовсе: result — это сразу идентификатор записи
    // таймлайна, голым числом.
    var commentID b24.ID
    if err := json.Unmarshal(res.Result, &commentID); err != nil {
    	return fmt.Errorf("разбор идентификатора комментария: %w", err)
    }
    ```

{% endlist %}

Мы добавили комментарий в таймлайн элемента смарт-процесса и в ответ получили ID записи таймлайна `55771`. ID записи можно использовать в методах [обновления](../../../api-reference/crm/timeline/comments/crm-timeline-comment-update.md) и [удаления](../../../api-reference/crm/timeline/comments/crm-timeline-comment-delete.md) комментария.

```json
{
    "result": 55771
}
```

## Проверим результат

Откройте элемент смарт-процесса в Битрикс24. Комментарий отображается в таймлайне элемента, в ленте под карточкой.

Через REST комментарии элемента возвращает метод [crm.timeline.comment.list](../../../api-reference/crm/timeline/comments/crm-timeline-comment-list.md) с теми же значениями `ENTITY_ID` и `ENTITY_TYPE`, что и на шаге 2.

{% list tabs %}

- JS

    ```javascript
    const checkResponse = await $b24.actions.v2.call.make({
        method: 'crm.timeline.comment.list',
        params: {
            filter: {
                "ENTITY_ID": 19,
                "ENTITY_TYPE": "DYNAMIC_177"
            },
            order: { ID: 'DESC' }
        },
        requestId: 'comment-list'
    });

    console.dir(checkResponse.getData().result);
    ```

- Python

    ```python
    comments = client.crm.timeline.comment.list(
        filter={
            "ENTITY_ID": 19,
            "ENTITY_TYPE": "DYNAMIC_177",
        },
        order={"ID": "DESC"},
    ).response.result
    ```


- PHP

    ```php
    // у crm.timeline.comment.list нет обёртки в SDK — вызываем метод напрямую
    $comments = $sb->core->call(
        'crm.timeline.comment.list',
        [
            'filter' => [
                'ENTITY_ID' => 19,
                'ENTITY_TYPE' => 'DYNAMIC_177',
            ],
            'order' => ['ID' => 'DESC'],
        ]
    )->getResponseData()->getResult();
    ```
{% endlist %}

Сценарий выполнен, если в ответе есть объект с `ID` из шага 2, а его поле `COMMENT` совпадает с отправленным текстом.

```json
{
    "result": [
        {
            "ID": "55771",
            "ENTITY_ID": 19,
            "ENTITY_TYPE": "dynamic_177",
            "CREATED": "2024-11-12T15:32:39+03:00",
            "COMMENT": "Подтвердить закупку по почте!",
            "AUTHOR_ID": "1"
        }
    ],
    "total": 1
}
```

В запросе `ENTITY_TYPE` можно передавать в любом регистре, а в ответе метод возвращает его в нижнем — `dynamic_177`. Это не признак ошибки.

## Ошибки и диагностика

Если метод вернул ошибку, проверьте данные запроса.

#|
|| **Код** | **Причина и действие** ||
|| `ACCESS_DENIED` | У пользователя нет административного доступа к разделу CRM, который требует [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md). Проверьте, от имени какого пользователя создан вебхук ||
|| `allowed_only_intranet_user` | Метод [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) разрешен только интранет-пользователям. Экстранет-пользователь и внешний пользователь сценарий не пройдут ||
|| `INVALID_ARG_VALUE` | В [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) передано несуществующее поле фильтра. Фильтруйте по полям объекта [type](../../../api-reference/crm/data-types.md#type), для поиска по названию — по полю `title` ||
|| `OWNER_NOT_FOUND` | В `ENTITY_TYPE` передан тип, которого в Битрикс24 нет. Соберите значение заново: префикс `DYNAMIC_` и `entityTypeId` из шага 1, а не `id` ||
|| `INVALID_ARG_VALUE` `Empty comment message` | В `COMMENT` передана пустая строка. Метод не создает пустые комментарии ||
|| `100` | Не переданы обязательные поля. В `fields` метода [crm.timeline.comment.add](../../../api-reference/crm/timeline/comments/crm-timeline-comment-add.md) нужны все три значения: `ENTITY_ID`, `ENTITY_TYPE` и `COMMENT` ||
|#

Метод [crm.timeline.comment.add](../../../api-reference/crm/timeline/comments/crm-timeline-comment-add.md) может вернуть идентификатор записи, а комментарий в таймлайне не появится. Метод не проверяет, существует ли элемент с переданным `ENTITY_ID`: если элемента нет, комментарий создается, но привязать его не к чему.

- проверьте `ENTITY_ID` методом [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) с `entityTypeId` из шага 1. Если элемента с таким идентификатором нет, возьмите существующий

- убедитесь, что `ENTITY_ID` — это идентификатор элемента, а не `id` или `entityTypeId` смарт-процесса

Повторяйте сценарий с того шага, который вернул ошибку. Шаг 1 ничего не создает, его можно выполнять сколько угодно раз. Если ошибку вернул шаг 2, комментарий не создан: исправьте `fields` и повторите только его.

## Что важно учитывать

- поля таймлайна пишутся в верхнем регистре — `ENTITY_ID`, `ENTITY_TYPE`, `COMMENT`. Методы [crm.item.*](../../../api-reference/crm/universal/index.md) для того же объекта принимают camelCase, например `entityTypeId`. Одна сущность, два соглашения в одном сценарии

- фильтр `title` в [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) не гарантирует единственный результат: двум смарт-процессам не запрещено называться одинаково. Метод всегда возвращает список, поэтому проверяйте, что в нем ровно один элемент, а не берите первый вслепую

- повторный запуск примера добавляет в таймлайн еще один комментарий, дубликаты не отсеиваются

## Пример кода

{% list tabs %}

- JS

    ```javascript
    import { B24Hook } from '@bitrix24/b24jssdk'

    const $b24 = B24Hook.fromWebhookUrl(process.env.B24_HOOK)
    // B24_HOOK = 'https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/'

    // Функция для поиска идентификатора смарт-процесса
    async function findSPA() {
        // Название смарт-процесса, для получения entityTypeId
        var SPAtitle = 'название_вашего_смарт_процесса';

        try {
            // Вызываем метод crm.type.list для получения entityTypeId
            const result = await $b24.actions.v2.call.make({
                method: 'crm.type.list',
                params: { filter: { title: SPAtitle } },
                requestId: 'type-list'
            });

            var types = result.getData().result.types;
            if (Array.isArray(types) && types.length > 0) {
                var SPAId = types[0].entityTypeId; // Предполагаем, что нужный объект первый в массиве
                console.log('Смарт-процесс найден', SPAId);
                await createComment(SPAId);
            } else {
                console.error('Смарт-процесс не найден или данные пусты');
            }
        } catch (error) {
            console.error('Ошибка при поиске смарт-процесса:', error);
        }
    }

    // Функция для создания комментария в элементе смарт-процесса
    async function createComment(SPAId) {
        // ID элемента, в который будет добавлен комментарий
        var elementId = 'ваш_ID_элемента';
        // Текст комментария
        var commentText = 'ваш_комментарий';

        try {
            // Вызываем метод crm.timeline.comment.add для добавления комментария
            const result = await $b24.actions.v2.call.make({
                method: 'crm.timeline.comment.add',
                params: {
                    fields: {
                        ENTITY_ID: elementId,
                        ENTITY_TYPE: 'DYNAMIC_' + SPAId,
                        COMMENT: commentText
                    }
                },
                requestId: 'comment-add'
            });
            console.log('Комментарий добавлен', result.getData().result);
        } catch (error) {
            console.error('Ошибка при создании комментария:', error);
        }
    }

    // Вызов функции для поиска смарт-процесса и добавления комментария
    findSPA();
    ```

- Python

    ```python
    from b24pysdk import BitrixWebhook, Client
    from b24pysdk.errors import BitrixAPIError


    def find_spa(client):
        spa_title = "название_вашего_смарт_процесса"

        try:
            resp = client.crm.type.list(
                filter={"title": spa_title},
            ).response
        except BitrixAPIError as error:
            print(f"Ошибка при поиске смарт-процесса: {error}")
            return

        types = resp.result["types"]
        if types:
            spa_id = types[0]["entityTypeId"]
            print(f"Смарт-процесс найден: {spa_id}")
            create_comment(client, spa_id)
        else:
            print("Смарт-процесс не найден или данные пусты")


    def create_comment(client, spa_id):
        element_id = "ваш_ID_элемента"
        comment_text = "ваш_комментарий"

        try:
            client.crm.timeline.comment.add(
                fields={
                    "ENTITY_ID": element_id,
                    "ENTITY_TYPE": f"DYNAMIC_{spa_id}",
                    "COMMENT": comment_text,
                },
            ).response
        except BitrixAPIError as error:
            print(f"Ошибка при создании комментария: {error}")
        else:
            print("Комментарий добавлен")


    client = Client(
        BitrixWebhook(
            domain="your-domain.bitrix24.com",
            webhook_token="user_id/webhook_key",
        )
    )

    find_spa(client)
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Services\ServiceBuilderFactory;
    use Bitrix24\SDK\Services\ServiceBuilder;
    use Symfony\Component\EventDispatcher\EventDispatcher;
    use Psr\Log\NullLogger;

    $sb = (new ServiceBuilderFactory(new EventDispatcher(), new NullLogger()))
        ->initFromWebhook('https://your-domain.bitrix24.ru/rest/USER_ID/TOKEN/');

    // Функция для поиска идентификатора смарт-процесса
    function findSPA(ServiceBuilder $sb) {
        // Название смарт-процесса, для получения entityTypeId
        $SPAtitle = 'название_вашего_смарт_процесса';

        try {
            // Вызываем метод crm.type.list для получения entityTypeId
            $types = $sb->getCRMScope()->type()->list(
                order: [],
                filter: ['title' => $SPAtitle]
            )->getTypes();

            if (is_array($types) && count($types) > 0) {
                $SPAId = $types[0]->entityTypeId; // Предполагаем, что нужный объект первый в массиве
                echo 'Смарт-процесс найден: ' . $SPAId;
                createComment($sb, $SPAId);
            } else {
                echo 'Смарт-процесс не найден или данные пусты';
            }
        } catch (\Throwable $e) {
            echo 'Ошибка при поиске смарт-процесса: ' . $e->getMessage();
        }
    }

    // Функция для создания комментария в элементе смарт-процесса
    function createComment(ServiceBuilder $sb, $SPAId) {
        // ID элемента, в который будет добавлен комментарий
        $elementId = 'ваш_ID_элемента';
        // Текст комментария
        $commentText = 'ваш_комментарий';

        try {
            // Вызываем метод crm.timeline.comment.add для добавления комментария
            $sb->getCRMScope()->timelineComment()->add(
                [
                    'ENTITY_ID' => $elementId,
                    'ENTITY_TYPE' => 'DYNAMIC_' . $SPAId,
                    'COMMENT' => $commentText
                ]
            );
            echo 'Комментарий добавлен';
        } catch (\Throwable $e) {
            echo 'Ошибка при создании комментария: ' . $e->getMessage();
        }
    }

    // Вызов функции для поиска смарт-процесса и добавления комментария
    findSPA($sb);
    ```

- Go

    ```go
    // Подготовка в пустом каталоге — go get без go mod init не сработает:
    //
    //	go mod init example && go get github.com/bitrix24/b24gosdk
    //
    // Запуск:
    //
    //	export B24_WEBHOOK_URL='https://ваш-портал.bitrix24.ru/rest/1/токен/' && go run .
    //
    // Пример самодостаточный: он создаёт смарт-процесс и элемент в нём, находит
    // смарт-процесс по названию, добавляет комментарий в таймлайн элемента и
    // убирает за собой. Запускается на любом портале, ничего править не нужно.
    package main

    import (
    	"context"
    	"encoding/json"
    	"errors"
    	"fmt"
    	"log"
    	"os"
    	"strconv"

    	b24 "github.com/bitrix24/b24gosdk"
    )

    // Название смарт-процесса — то же, что ищет шаг 1.
    const spaTitle = "Закупка оборудования (пример b24gosdk)"

    func main() {
    	if err := run(context.Background()); err != nil {
    		log.Fatal(err)
    	}
    }

    func run(ctx context.Context) error {
    	// Путь вебхука — это секрет, поэтому он приходит из окружения, а не из кода.
    	core := b24.NewClient(os.Getenv("B24_WEBHOOK_URL")).Core()

    	// --- подготовка: свой смарт-процесс и элемент в нём

    	typeID, err := addType(ctx, core, spaTitle)
    	if err != nil {
    		return err
    	}
    	defer del(ctx, core, "crm.type.delete", b24.Params{"id": typeID})

    	// entityTypeId нужен и для создания элемента, и для комментария, но пока
    	// известен только id самого типа — за entityTypeId идём на шаге 1.

    	// --- шаг 1: находим смарт-процесс по названию
    	res, err := core.Call(ctx, "crm.type.list", b24.Params{
    		"filter": b24.Params{"title": spaTitle},
    	}, b24.WithIdempotent())
    	if err != nil {
    		return fmt.Errorf("crm.type.list: %w", err)
    	}

    	// Метод заворачивает ответ в объект с ключом types. Двум смарт-процессам
    	// никто не запрещает называться одинаково, поэтому ответ — список даже при
    	// точном фильтре.
    	var types struct {
    		Types []struct {
    			ID           int    `json:"id"`
    			EntityTypeID int    `json:"entityTypeId"`
    			Title        string `json:"title"`
    		} `json:"types"`
    	}
    	if err := json.Unmarshal(res.Result, &types); err != nil {
    		return fmt.Errorf("разбор смарт-процессов: %w", err)
    	}
    	if len(types.Types) == 0 {
    		return fmt.Errorf("смарт-процесс %q не найден", spaTitle)
    	}

    	// id — порядковый номер смарт-процесса, entityTypeId — идентификатор его
    	// ТИПА. Дальше нужен именно entityTypeId, это разные числа.
    	entityTypeID := types.Types[0].EntityTypeID
    	fmt.Printf("смарт-процесс %q: id=%d, entityTypeId=%d\n",
    		types.Types[0].Title, types.Types[0].ID, entityTypeID)

    	itemID, err := addItem(ctx, core, entityTypeID, "Закупка ноутбуков")
    	if err != nil {
    		return err
    	}
    	defer del(ctx, core, "crm.item.delete", b24.Params{
    		"entityTypeId": entityTypeID, "id": itemID,
    	})

    	// --- шаг 2: добавляем комментарий в таймлайн элемента
    	// ENTITY_TYPE для смарт-процесса — это строка "DYNAMIC_" + entityTypeId.
    	// Поля таймлайна пишутся В ВЕРХНЕМ РЕГИСТРЕ, тогда как crm.item.* принимает
    	// camelCase: одна сущность, два соглашения в одном сценарии.
    	res, err = core.Call(ctx, "crm.timeline.comment.add", b24.Params{
    		"fields": b24.Params{
    			"ENTITY_ID":   itemID,
    			"ENTITY_TYPE": "DYNAMIC_" + strconv.Itoa(entityTypeID),
    			"COMMENT":     "Подтвердить закупку по почте!",
    		},
    	})
    	if err != nil {
    		return fmt.Errorf("crm.timeline.comment.add: %w", err)
    	}

    	// Обёртки здесь нет вовсе: result — это сразу идентификатор записи
    	// таймлайна, голым числом.
    	var commentID b24.ID
    	if err := json.Unmarshal(res.Result, &commentID); err != nil {
    		return fmt.Errorf("разбор идентификатора комментария: %w", err)
    	}
    	fmt.Printf("комментарий %d добавлен в элемент %d\n", commentID, itemID)
    	return nil
    }

    // --- вспомогательное: подготовка данных и уборка

    // addType создаёт смарт-процесс. entityTypeId намеренно не передаётся: его
    // выдаёт портал, и именно за ним идёт шаг 1.
    func addType(ctx context.Context, core *b24.Core, title string) (b24.ID, error) {
    	// isRecyclebinEnabled выключаем осознанно: элемент в корзине всё ещё
    	// считается элементом, а crm.type.delete отказывается удалять тип, у
    	// которого есть элементы.
    	res, err := core.Call(ctx, "crm.type.add", b24.Params{
    		"fields": b24.Params{"title": title, "isRecyclebinEnabled": "N"},
    	})
    	if err != nil {
    		// На тарифах без смарт-процессов метод отвечает отдельным кодом.
    		// Код сравнивается через errors.Is, а не строкой: опечатка в литерале
    		// скомпилируется и молча уведёт в другую ветку.
    		if errors.Is(err, b24.Code("CREATE_DYNAMIC_TYPE_RESTRICTED")) {
    			return 0, fmt.Errorf("на этом портале нельзя создать смарт-процесс: %w", err)
    		}
    		return 0, fmt.Errorf("crm.type.add: %w", err)
    	}
    	raw, ok := b24.Unwrap(res.Result, "type", "id")
    	if !ok {
    		return 0, fmt.Errorf("нет type.id в %s", res.Result)
    	}
    	var id b24.ID
    	return id, json.Unmarshal(raw, &id)
    }

    func addItem(ctx context.Context, core *b24.Core, entityTypeID int, title string) (b24.ID, error) {
    	res, err := core.Call(ctx, "crm.item.add", b24.Params{
    		"entityTypeId": entityTypeID,
    		"fields":       b24.Params{"title": title},
    	})
    	if err != nil {
    		return 0, fmt.Errorf("crm.item.add: %w", err)
    	}
    	raw, ok := b24.Unwrap(res.Result, "item", "id")
    	if !ok {
    		return 0, fmt.Errorf("нет item.id в %s", res.Result)
    	}
    	var id b24.ID
    	return id, json.Unmarshal(raw, &id)
    }

    // del убирает созданное. Ошибку уборки печатаем, но не возвращаем: она не
    // должна подменить собой настоящую ошибку сценария.
    func del(ctx context.Context, core *b24.Core, method string, params b24.Params) {
    	if _, err := core.Call(ctx, method, params); err != nil {
    		fmt.Fprintf(os.Stderr, "уборка, %s: %v\n", method, err)
    	}
    }
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](../../../api-reference/crm/timeline/comments/crm-timeline-comment-add.md)
- [{#T}](../../../api-reference/crm/timeline/comments/crm-timeline-comment-list.md)
- [{#T}](../../../api-reference/crm/timeline/comments/crm-timeline-comment-update.md)
- [{#T}](../../../api-reference/crm/timeline/comments/crm-timeline-comment-delete.md)
- [{#T}](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md)
- [{#T}](../../../api-reference/crm/universal/crm-item-list.md)
- [{#T}](../../../api-reference/crm/data-types.md)
