FROM envoyproxy/envoy-dev:9170b3e6cd110c0fd4aea1fdbb683d8dd9e284fc
COPY envoy.yaml /etc/envoy/envoy.yaml
RUN chmod go+r /etc/envoy/envoy.yaml
