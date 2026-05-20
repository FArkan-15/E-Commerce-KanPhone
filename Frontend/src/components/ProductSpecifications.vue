<script setup>
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  selectedColor: {
    type: Object,
    default: null
  }
})

const parseFeatures = (features) => Array.isArray(features) ? features.join(', ') : (features || '-')
const parseBoolean = (val) => val ? 'Yes' : (val === false || val === 0 ? 'No' : '-')

const specifications = computed(() => {
  const p = props.product
  const cat = p.category_slug?.toLowerCase() || p.category?.toLowerCase() || ''
  const catId = p.category_id
  const type = p.type?.toLowerCase() || p.product_type?.toLowerCase() || ''
  
  let specs = []

  // Handphone
  if (cat === 'handphone' || catId == 3) {
    specs = [
      { label: 'Brand', value: p.brand || '-' },
      { label: 'Color', type: 'color' },
      { label: 'Network', value: p.network || '-' },
      { label: 'Operating System', value: p.os || '-' },
      { label: 'Processor', value: p.processor || '-' },
      { label: 'RAM', value: p.ram ? `${p.ram} GB` : '-' },
      { label: 'Capacity', value: p.storage ? `${p.storage} GB` : '-' },
      { label: 'Screen Size', value: p.screen_size || '-' },
      { label: 'Display Type', value: p.display_type || '-' },
      { label: 'Resolution', value: p.resolution || '-' },
      { label: 'Rear Camera', value: p.camera || '-', pre: true },
      { label: 'Front Camera', value: p.front_camera || '-' },
      { label: 'Audio', value: p.audio || '-' },
      { label: 'Sensor', value: p.sensors || p.sensor || '-' },
      { label: 'Battery', value: p.battery || '-' },
      { label: 'Charging', value: p.charging || '-' },
      { label: 'Weight', value: p.weight || '-' },
    ]
  }
  // Smartwatch
  else if (cat === 'smartwatch') {
    specs = [
      { label: 'Brand', value: p.brand || '-' },
      { label: 'Color', type: 'color' },
      { label: 'Screen Size', value: p.screen_size || '-' },
      { label: 'Display Type', value: p.display_type || '-' },
      { label: 'Connectivity', value: p.connectivity || (p.wireless ? 'Wireless' : '-') },
      { label: 'Compatibility', value: p.compatibility || '-' },
      { label: 'Features', value: parseFeatures(p.features) },
      { label: 'Waterproof', value: parseBoolean(p.waterproof) },
      { label: 'Battery', value: p.battery || '-' },
      { label: 'Weight', value: p.weight || '-' },
    ]
  }
  // Audio
  else if (cat === 'audio') {
    specs = [
      { label: 'Brand', value: p.brand || '-' },
      { label: 'Model', value: p.model || '-' },
      { label: 'Tipe Audio', value: p.type || '-' },
      { label: 'Driver', value: p.driver || '-' },
      { label: 'Frequency Response', value: p.frequency_response || p.frequency || '-' },
      { label: 'Connectivity', value: p.connectivity || (p.wireless ? 'Wireless' : 'Wired') },
      { label: 'Cable Type', value: p.cable_type || '-' },
      { label: 'Connector', value: p.connector || '-' },
      { label: 'Fitur Spesial', value: parseFeatures(p.features) },
    ]
    if (p.battery) specs.push({ label: 'Battery', value: p.battery })
    if (p.weight) specs.push({ label: 'Weight', value: p.weight })
  }
  // Camera
  else if (cat === 'camera') {
    specs = [
      { label: 'Brand', value: p.brand || '-' },
      { label: 'Model', value: p.model || '-' },
      { label: 'Type', value: p.type || '-' },
      { label: 'Sensor', value: p.sensors || p.sensor || '-' },
      { label: 'Resolution', value: p.resolution || '-' },
      { label: 'Image Processor', value: p.image_processor || '-' },
      { label: 'ISO Range', value: p.iso_range || p.iso || '-' },
      { label: 'Autofocus', value: p.autofocus || '-' },
      { label: 'Video Recording', value: p.video_recording || p.video || '-' },
      { label: 'Display', value: p.display || p.display_type || '-' },
      { label: 'Viewfinder', value: p.viewfinder || '-' },
      { label: 'Connectivity', value: p.connectivity || '-' },
      { label: 'Storage', value: p.storage || '-' },
      { label: 'Battery Life', value: p.battery_life || p.battery || '-' },
      { label: 'Lens Mount', value: p.lens_mount || p.lens || '-' },
    ]
  }
  // Console
  else if (cat === 'console') {
    specs = [
      { label: 'Brand', value: p.brand || '-' },
      { label: 'Model', value: p.model || '-' },
      { label: 'Type', value: p.type || '-' },
      { label: 'Connectivity', value: p.connectivity || '-' },
      { label: 'Battery', value: p.battery || '-' },
      { label: 'Battery Life', value: p.battery_life || '-' },
      { label: 'Compatibility', value: p.compatibility || '-' },
      { label: 'Special Features', value: parseFeatures(p.features) },
      { label: 'Charging Port', value: p.charging_port || p.charging || '-' },
      { label: 'Weight', value: p.weight || '-' },
    ]
  }
  // Accessories
  else if (['accessories', 'aksesoris'].includes(cat) || catId == 4) {
    if (type === 'charger') {
      specs = [
        { label: 'Brand', value: p.brand || '-' },
        { label: 'Model', value: p.model || '-' },
        { label: 'Charger Type', value: p.charger_type || '-' },
        { label: 'Output Power', value: p.output_power || '-' },
        { label: 'Port', value: p.port || '-' },
        { label: 'Fast Charging', value: parseBoolean(p.fast_charging) },
      ]
    } else if (['stand laptop', 'stand_laptop', 'stand'].includes(type)) {
      specs = [
        { label: 'Brand', value: p.brand || '-' },
        { label: 'Rotation', value: p.rotation || '-' },
        { label: 'Material', value: p.material || '-' },
        { label: 'Max Load Capacity', value: p.max_load_capacity || '-' },
        { label: 'Cooling Design', value: p.cooling_design || '-' },
      ]
    } else if (type === 'case') {
      specs = [
        { label: 'Brand', value: p.brand || '-' },
        { label: 'Color', type: 'color' },
        { label: 'Material', value: p.material || '-' },
        { label: 'Product Type', value: p.product_type || p.type || '-' },
        { label: 'Magnetic Closure', value: parseBoolean(p.magnetic_closure) },
        { label: 'Compatibility', value: p.compatibility || '-' },
        { label: 'Weight', value: p.weight || '-' },
      ]
    } else if (['power bank', 'power_bank', 'powerbank'].includes(type)) {
      specs = [
        { label: 'Brand', value: p.brand || '-' },
        { label: 'Battery Type', value: p.battery_type || '-' },
        { label: 'Capacity', value: p.capacity || '-' },
        { label: 'Input Port', value: p.input_port || '-' },
        { label: 'Fast Charging', value: parseBoolean(p.fast_charging) },
        { label: 'Weight', value: p.weight || '-' },
        { label: 'Output Port', value: p.output_port || '-' },
      ]
    } else {
      specs = [
        { label: 'Brand', value: p.brand || '-' },
        { label: 'Color', type: 'color' },
      ]
      if (p.type || p.product_type) specs.push({ label: 'Type', value: p.type || p.product_type })
    }
  }
  // Default fallback
  else {
    specs = [
      { label: 'Brand', value: p.brand || '-' },
      { label: 'Color', type: 'color' },
    ]
    if (p.type) specs.push({ label: 'Type', value: p.type })
    if (p.model) specs.push({ label: 'Model', value: p.model })
    if (p.connectivity) specs.push({ label: 'Connectivity', value: p.connectivity })
    if (p.battery) specs.push({ label: 'Battery', value: p.battery })
    if (p.weight) specs.push({ label: 'Weight', value: p.weight })
    if (p.description) specs.push({ label: 'Description', value: p.description })
  }

  return specs
})
</script>

<template>
  <div class="border-t border-gray-200 max-w-4xl">
    <div 
      v-for="(spec, index) in specifications" 
      :key="index"
      class="grid grid-cols-3 py-3 border-b border-gray-100 px-5"
      :class="index % 2 === 0 ? 'bg-red-50/30' : ''"
    >
      <div class="col-span-1 text-[13px] text-gray-600">{{ spec.label }}</div>
      <div class="col-span-2 text-[13px] text-gray-900" :class="spec.pre ? 'whitespace-pre-line' : ''">
        <!-- Render Color Dot if type is color -->
        <template v-if="spec.type === 'color'">
          <div class="flex items-center gap-2">
            <span 
              v-if="selectedColor" 
              class="inline-block w-3 h-3 rounded-full border border-gray-200" 
              :style="{ backgroundColor: selectedColor.color }"
            ></span>
            {{ selectedColor?.color_name || selectedColor?.name || selectedColor?.color || product.color || '-' }}
          </div>
        </template>
        <!-- Render standard text -->
        <template v-else>
          {{ spec.value }}
        </template>
      </div>
    </div>
  </div>
</template>
