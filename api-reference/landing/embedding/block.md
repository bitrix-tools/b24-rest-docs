# Пункт редактирования блока LANDING_BLOCK_<CODE> и LANDING_BLOCK_*

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)

Виджеты `LANDING_BLOCK_<CODE>` и `LANDING_BLOCK_*` добавляют пункт приложения в меню действий блока в редакторе страницы.

Используйте их, когда приложение работает с отдельным блоком, а не со всей страницей. Например:

- переводит текст блока и записывает перевод обратно
- проверяет ссылку на изображение в блоке

Если действие относится ко всему сайту или странице, например проверяет метатеги, используйте [LANDING_SETTINGS](./settings.md).

Место встраивания регистрируют методом [landing.repo.bind](./landing-repo-bind.md), а не [placement.bind](../../widgets/placement-bind.md). Метод работает только в контексте приложения, через вебхук место встраивания не зарегистрировать.

{% note info "" %}

Место встраивания не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код места встраивания** | **Место** ||
|| `LANDING_BLOCK_<CODE>` | Пункт в меню действий блоков одного вида.

Для стандартного блока `<CODE>` — его символьный код, например `04.1.one_col_fix_with_title`. Коды стандартных блоков возвращает метод [landing.block.getrepository](../block/methods/landing-block-get-repository.md).

Для блока, который приложение зарегистрировало методом [landing.repo.register](../user-blocks/landing-repo-register.md), `<CODE>` — это `repo_<ID>`, где `<ID>` — идентификатор блока в репозитории из ответа метода. Например, `LANDING_BLOCK_repo_1132` ||
|| `LANDING_BLOCK_*` | Пункт в меню действий всех блоков ||
|#

Регистр символов в коде не важен.

### Где находится в интерфейсе

Откройте страницу в режиме редактирования и наведите курсор на блок. Справа от кнопки *Редактировать* появится кнопка *Еще* — пункт приложения находится в ее выпадающем списке. Подпись пункта — значение `TITLE` из регистрации, а если оно пустое, — название приложения. Если приложение зарегистрировало для блока и `<CODE>`, и `*`, в списке будут оба пункта.

Пункт видят все, кто открывает страницу в редакторе: права на изменение блока при показе пункта не проверяются. Если действие приложения меняет блок, проверяйте права в обработчике.

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php
Array
(
    [DOMAIN] => example.bitrix24.ru
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 0123456789abcdef0123456789abcdef
    [APPLICATION_SCOPE] => crm,placement,landing
    [APPLICATION_TOKEN] => xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    [AUTH_ID] => 6061e72600631fcd00005a4b00000001f0f1076700000000f69dd5fc643d9ce2fdbc1
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 50e00aa340631fcd00005a4b00000001f0f1071111116580a5b83c2de639ef28c12
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [member_id] => abcdef1234567890abcdef1234567890
    [status] => F
    [PLACEMENT] => LANDING_BLOCK_*
    [PLACEMENT_OPTIONS] => {"ID":"996","CODE":"43.4.cover_with_price_text_button_bgimg","LID":"30","URI":"\/sites\/site\/12\/view\/30\/"}
)
```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../../widgets/_includes/widget_data.md) %}

Часть кода после `LANDING_BLOCK_` в параметре `PLACEMENT` приходит в нижнем регистре: `LANDING_BLOCK_*`, `LANDING_BLOCK_04.1.one_col_fix_with_title` или `LANDING_BLOCK_repo_1132`.

### PLACEMENT_OPTIONS {#placement-options}

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова.

Для `LANDING_BLOCK_<CODE>` и `LANDING_BLOCK_*` в контекст передаются одинаковые ключи:

#|
|| **Ключ**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор блока на странице. Его принимают методы раздела [Блоки](../block/index.md), например [landing.block.getbyid](../block/methods/landing-block-get-by-id.md). Это не идентификатор блока в репозитории из кода `LANDING_BLOCK_repo_<ID>` ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код блока, например `04.1.one_col_fix_with_title` или `repo_1132` ||
|| **LID**
[`string`](../../data-types.md) | Идентификатор страницы, на которой открыт блок ||
|| **URI**
[`string`](../../data-types.md) | Путь с query-строкой страницы, из которой открыт виджет. Если адрес страницы определить не удалось, ключ не передается ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Примеры регистрируют пункт для стандартного блока `04.1.one_col_fix_with_title`. Чтобы пункт появился у всех блоков, передайте в `PLACEMENT` значение `LANDING_BLOCK_*`, остальные поля те же.

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "fields": {
          "PLACEMENT": "LANDING_BLOCK_04.1.one_col_fix_with_title",
          "PLACEMENT_HANDLER": "https://your-domain.com/widgets/landing-block-handler.php",
          "TITLE": "Мой виджет для блока"
        },
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/landing.repo.bind
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'landing.repo.bind',
        params: {
          fields: {
            PLACEMENT: 'LANDING_BLOCK_04.1.one_col_fix_with_title',
            PLACEMENT_HANDLER: 'https://your-domain.com/widgets/landing-block-handler.php',
            TITLE: 'Мой виджет для блока',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Binding result:', result)
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
      async function bindLandingBlock() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.repo.bind',
            params: {
              fields: {
                PLACEMENT: 'LANDING_BLOCK_04.1.one_col_fix_with_title',
                PLACEMENT_HANDLER: 'https://your-domain.com/widgets/landing-block-handler.php',
                TITLE: 'Мой виджет для блока',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Binding result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', bindLandingBlock)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "PLACEMENT": "LANDING_BLOCK_04.1.one_col_fix_with_title",
        "PLACEMENT_HANDLER": "https://your-domain.com/widgets/landing-block-handler.php",
        "TITLE": "Мой виджет для блока",
    }

    try:
        bitrix_response = client.landing.repo.bind(fields=fields).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.repo.bind',
                [
                    'fields' => [
                        'PLACEMENT' => 'LANDING_BLOCK_04.1.one_col_fix_with_title',
                        'PLACEMENT_HANDLER' => 'https://your-domain.com/widgets/landing-block-handler.php',
                        'TITLE' => 'Мой виджет для блока',
                    ],
                ]
            );

        $result = $response->getResponseData()->getResult();
        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding landing block: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repo.bind',
        {
            fields: {
                PLACEMENT: 'LANDING_BLOCK_04.1.one_col_fix_with_title',
                PLACEMENT_HANDLER: 'https://your-domain.com/widgets/landing-block-handler.php',
                TITLE: 'Мой виджет для блока'
            }
        },
        function(result)
        {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.repo.bind',
        [
            'fields' => [
                'PLACEMENT' => 'LANDING_BLOCK_04.1.one_col_fix_with_title',
                'PLACEMENT_HANDLER' => 'https://your-domain.com/widgets/landing-block-handler.php',
                'TITLE' => 'Мой виджет для блока',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "landing.repo.bind", b24.Params{
    	"fields": b24.Params{
    		"PLACEMENT":         "LANDING_BLOCK_04.1.one_col_fix_with_title",
    		"PLACEMENT_HANDLER": "https://your-domain.com/widgets/landing-block-handler.php",
    		"TITLE":             "Мой виджет для блока",
    	},
    })
    if err != nil {
    	return fmt.Errorf("landing.repo.bind: %w", err)
    }

    // Ответ приходит как json.RawMessage. При успехе result = true.
    // Форма ответа описана на странице метода landing.repo.bind.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Как обновить блок из приложения {#refresh-block}

Если приложение изменило содержимое блока, например методом [landing.block.updatenodes](../block/methods/landing-block-update-nodes.md), редактор продолжает показывать старую версию. Чтобы перерисовать блок, вызовите из фрейма виджета команду `refreshBlock` метода [BX24.placement.call](../../widgets/ui-interaction/bx24-placement-call.md).

Команда работает только внутри открытого виджета `LANDING_BLOCK_<CODE>` или `LANDING_BLOCK_*`: ее выполняет редактор страницы, отдельного REST-метода для нее нет.

Команде передают `id` — идентификатор блока на странице, строкой или числом. Возьмите его из ключа `ID` в [PLACEMENT_OPTIONS](#placement-options).

Функция обратного вызова срабатывает после того, как редактор перезагрузит блок. Если блока с таким `id` нет на открытой странице, команда ничего не делает и функция обратного вызова не вызывается.

{% list tabs %}

- JS (TS)

    ```ts
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Block ID from PLACEMENT_OPTIONS.ID
    const options = $b24.placement.options as { ID: string }

    await $b24.placement.call('refreshBlock', { id: Number(options.ID) })
    console.info('Block refreshed')
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      document.addEventListener('DOMContentLoaded', async () => {
        const $b24 = await B24Js.initializeB24Frame()

        // Block ID from PLACEMENT_OPTIONS.ID
        const blockId = Number($b24.placement.options.ID)

        await $b24.placement.call('refreshBlock', { id: blockId })
        console.info('Block refreshed')
      })
    </script>
    ```

- BX24.js

    ```js
    BX24.ready(function () {
        BX24.init(function () {
            // Идентификатор блока из PLACEMENT_OPTIONS.ID
            var blockId = Number(BX24.placement.info().options.ID);

            BX24.placement.call('refreshBlock', { id: blockId }, function () {
                console.log('Блок обновлен');
            });
        });
    });
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./landing-repo-bind.md)
- [{#T}](./landing-repo-unbind.md)
- [{#T}](./settings.md)
- [{#T}](../block/methods/landing-block-update-nodes.md)
- [{#T}](../block/methods/landing-block-get-repository.md)
- [{#T}](../user-blocks/landing-repo-register.md)
- [{#T}](../../widgets/ui-interaction/bx24-placement-call.md)
- [{#T}](../../widgets/bx24-widget-methods.md)
