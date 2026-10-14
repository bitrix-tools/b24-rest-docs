# Пункт в меню настроек сайта и страницы LANDING_SETTINGS

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)

Виджет `LANDING_SETTINGS` добавляет пункт приложения в меню настроек сайта или страницы в режиме редактирования.

Используйте его, когда приложение работает со всем сайтом или страницей целиком. Например:

- проверяет метатеги и заголовки страницы перед публикацией
- отправляет страницу на внешнюю модерацию или согласование

Если действие относится к отдельному блоку, используйте [LANDING_BLOCK_<CODE> или LANDING_BLOCK_*](./block.md).

Место встраивания регистрируют методом [landing.repo.bind](./landing-repo-bind.md), а не [placement.bind](../../widgets/placement-bind.md). Метод работает только в контексте приложения, через вебхук место встраивания не зарегистрировать.

{% note info "" %}

Место встраивания не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код места встраивания** | **Место** ||
|| `LANDING_SETTINGS` | Пункт в меню настроек сайта или страницы ||
|#

### Где находится в интерфейсе

Откройте сайт или страницу в режиме редактирования. В правом верхнем углу перейдите в *Возможности сайта > Настройки*. Пункты приложений выводятся в конце левого меню слайдера, новые выше старых. Подпись пункта — значение `TITLE` из регистрации: если оно пустое, пункт выводится без подписи, название приложения не подставляется.

Настройки сайта и настройки страницы открываются в одном слайдере, поэтому пункт приложения один на оба раздела. Пункт видят все, кто открыл слайдер настроек, даже без права на изменение настроек.

В настройках Главной страницы, сайта с типом `VIBE`, пункты приложений не выводятся.

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
    [PLACEMENT] => LANDING_SETTINGS
    [PLACEMENT_OPTIONS] => {"SITE_ID":"12","LID":"30"}
)
```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../../widgets/_includes/widget_data.md) %}

### PLACEMENT_OPTIONS {#placement-options}

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова.

Для `LANDING_SETTINGS` в контекст передаются ключи:

#|
|| **Ключ**
`тип` | **Описание** ||
|| **SITE_ID**
[`string`](../../data-types.md) | Идентификатор сайта, в настройках которого открыт виджет ||
|| **LID**
[`string`](../../data-types.md) | Идентификатор страницы, из редактора которой открыты настройки. Если настройки открыты без привязки к странице, приходит `0` ||
|| **URI**
[`string`](../../data-types.md) | Путь с query-строкой страницы, из которой открыт виджет. Если адрес страницы определить не удалось, ключ не передается ||
|#

По идентификаторам из `PLACEMENT_OPTIONS` обработчик получает данные сайта и страницы:

- сайт — методом [landing.site.getList](../site/landing-site-get-list.md) с фильтром по `ID`, его дополнительные поля — методом [landing.site.getadditionalfields](../site/landing-site-get-additional-fields.md)
- страницу — методом [landing.landing.getList](../page/methods/landing-landing-get-list.md) с фильтром по `ID`, ее метатеги и другие дополнительные поля — методом [landing.landing.getadditionalfields](../page/methods/landing-landing-get-additional-fields.md)

Если настройки открыты у Базы знаний или сайта группы, передайте в эти методы параметр `scope`, иначе они не найдут сайт. Значения описаны в статье [Работа с типами сайтов и скоупами](../types.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "fields": {
          "PLACEMENT": "LANDING_SETTINGS",
          "PLACEMENT_HANDLER": "https://your-domain.com/widgets/landing-settings-handler.php",
          "TITLE": "Мои настройки"
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
            PLACEMENT: 'LANDING_SETTINGS',
            PLACEMENT_HANDLER: 'https://your-domain.com/widgets/landing-settings-handler.php',
            TITLE: 'Мои настройки',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Landing settings bound:', result)
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
      async function bindLandingSettings() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.repo.bind',
            params: {
              fields: {
                PLACEMENT: 'LANDING_SETTINGS',
                PLACEMENT_HANDLER: 'https://your-domain.com/widgets/landing-settings-handler.php',
                TITLE: 'Мои настройки',
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
          console.info('Landing settings bound:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', bindLandingSettings)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "PLACEMENT": "LANDING_SETTINGS",
        "PLACEMENT_HANDLER": "https://your-domain.com/widgets/landing-settings-handler.php",
        "TITLE": "Мои настройки",
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
                        'PLACEMENT' => 'LANDING_SETTINGS',
                        'PLACEMENT_HANDLER' => 'https://your-domain.com/widgets/landing-settings-handler.php',
                        'TITLE' => 'Мои настройки',
                    ],
                ]
            );

        $result = $response->getResponseData()->getResult();
        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding landing settings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repo.bind',
        {
            fields: {
                PLACEMENT: 'LANDING_SETTINGS',
                PLACEMENT_HANDLER: 'https://your-domain.com/widgets/landing-settings-handler.php',
                TITLE: 'Мои настройки'
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
                'PLACEMENT' => 'LANDING_SETTINGS',
                'PLACEMENT_HANDLER' => 'https://your-domain.com/widgets/landing-settings-handler.php',
                'TITLE' => 'Мои настройки',
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
    		"PLACEMENT":         "LANDING_SETTINGS",
    		"PLACEMENT_HANDLER": "https://your-domain.com/widgets/landing-settings-handler.php",
    		"TITLE":             "Мои настройки",
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

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./landing-repo-bind.md)
- [{#T}](./landing-repo-unbind.md)
- [{#T}](../page/methods/landing-landing-get-additional-fields.md)
- [{#T}](../site/landing-site-get-additional-fields.md)
- [{#T}](./block.md)
- [{#T}](../../widgets/bx24-widget-methods.md)
