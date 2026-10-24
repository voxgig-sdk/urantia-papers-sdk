package voxgigurantiapaperssdk

import (
	"github.com/voxgig-sdk/urantia-papers-sdk/go/core"
	"github.com/voxgig-sdk/urantia-papers-sdk/go/entity"
	"github.com/voxgig-sdk/urantia-papers-sdk/go/feature"
	_ "github.com/voxgig-sdk/urantia-papers-sdk/go/utility"
)

// Type aliases preserve external API.
type UrantiaPapersSDK = core.UrantiaPapersSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type UrantiaPapersEntity = core.UrantiaPapersEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type UrantiaPapersError = core.UrantiaPapersError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewAudioEntityFunc = func(client *core.UrantiaPapersSDK, entopts map[string]any) core.UrantiaPapersEntity {
		return entity.NewAudioEntity(client, entopts)
	}
	core.NewBibleEntityFunc = func(client *core.UrantiaPapersSDK, entopts map[string]any) core.UrantiaPapersEntity {
		return entity.NewBibleEntity(client, entopts)
	}
	core.NewCitationEntityFunc = func(client *core.UrantiaPapersSDK, entopts map[string]any) core.UrantiaPapersEntity {
		return entity.NewCitationEntity(client, entopts)
	}
	core.NewEmbeddingEntityFunc = func(client *core.UrantiaPapersSDK, entopts map[string]any) core.UrantiaPapersEntity {
		return entity.NewEmbeddingEntity(client, entopts)
	}
	core.NewEntityEntityFunc = func(client *core.UrantiaPapersSDK, entopts map[string]any) core.UrantiaPapersEntity {
		return entity.NewEntityEntity(client, entopts)
	}
	core.NewFeedbackEntityFunc = func(client *core.UrantiaPapersSDK, entopts map[string]any) core.UrantiaPapersEntity {
		return entity.NewFeedbackEntity(client, entopts)
	}
	core.NewLanguageEntityFunc = func(client *core.UrantiaPapersSDK, entopts map[string]any) core.UrantiaPapersEntity {
		return entity.NewLanguageEntity(client, entopts)
	}
	core.NewOgnEntityFunc = func(client *core.UrantiaPapersSDK, entopts map[string]any) core.UrantiaPapersEntity {
		return entity.NewOgnEntity(client, entopts)
	}
	core.NewPaperEntityFunc = func(client *core.UrantiaPapersSDK, entopts map[string]any) core.UrantiaPapersEntity {
		return entity.NewPaperEntity(client, entopts)
	}
	core.NewParagraphEntityFunc = func(client *core.UrantiaPapersSDK, entopts map[string]any) core.UrantiaPapersEntity {
		return entity.NewParagraphEntity(client, entopts)
	}
	core.NewQuoteEntityFunc = func(client *core.UrantiaPapersSDK, entopts map[string]any) core.UrantiaPapersEntity {
		return entity.NewQuoteEntity(client, entopts)
	}
	core.NewScriptureEntityFunc = func(client *core.UrantiaPapersSDK, entopts map[string]any) core.UrantiaPapersEntity {
		return entity.NewScriptureEntity(client, entopts)
	}
	core.NewSearchEntityFunc = func(client *core.UrantiaPapersSDK, entopts map[string]any) core.UrantiaPapersEntity {
		return entity.NewSearchEntity(client, entopts)
	}
	core.NewTableOfContentEntityFunc = func(client *core.UrantiaPapersSDK, entopts map[string]any) core.UrantiaPapersEntity {
		return entity.NewTableOfContentEntity(client, entopts)
	}
	core.NewToolEntityFunc = func(client *core.UrantiaPapersSDK, entopts map[string]any) core.UrantiaPapersEntity {
		return entity.NewToolEntity(client, entopts)
	}
	core.NewWorkEntityFunc = func(client *core.UrantiaPapersSDK, entopts map[string]any) core.UrantiaPapersEntity {
		return entity.NewWorkEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewUrantiaPapersSDK = core.NewUrantiaPapersSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewUrantiaPapersSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *UrantiaPapersSDK  { return NewUrantiaPapersSDK(nil) }
func Test() *UrantiaPapersSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
